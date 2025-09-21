// src/app/services/supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, RealtimeChannel } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface Message {
  id?: number;
  content: string;
  username: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  private channel!: RealtimeChannel; // เพิ่มตัวแปรสำหรับ channel

  messages$ = this.messagesSubject.asObservable();

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    this.listenToMessages(); // เรียกฟังก์ชันเพื่อเริ่มดักฟัง
  }

  // ดึงข้อความทั้งหมดตอนเริ่มต้น
  async fetchMessages() {
    const { data, error } = await this.supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      this.messagesSubject.next(data as Message[]);
    }
  }

  // ส่งข้อความใหม่
  async sendMessage(message: Message) {
    const { error } = await this.supabase.from('messages').insert([message]);
    if (error) {
      console.error('Error sending message:', error);
    }
  }

  // *** ส่วนที่แก้ไขและเพิ่มเติม ***
  // ฟังการเปลี่ยนแปลง (Real-time)
  private listenToMessages() {
    // ใช้ชื่อ channel ที่ไม่ซ้ำใคร
    this.channel = this.supabase
      .channel('chat-room-public')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          console.log('New message received!', payload); // Log เมื่อมีข้อความใหม่เข้ามา
          const newMessage = payload.new as Message;
          const currentMessages = this.messagesSubject.getValue();
          this.messagesSubject.next([...currentMessages, newMessage]);
        }
      )
      .subscribe((status) => {
        // เพิ่มส่วนตรวจสอบสถานะการเชื่อมต่อ
        if (status === 'SUBSCRIBED') {
          console.log('Successfully subscribed to the real-time channel!');
        } else {
          console.log('Real-time subscription status:', status);
        }
      });
  }

  // (Optional) เพิ่มฟังก์ชันสำหรับยกเลิกการเชื่อมต่อเมื่อไม่ใช้งาน
  unsubscribe() {
    if (this.channel) {
      this.supabase.removeChannel(this.channel);
    }
  }
}