// src/app/services/supabase.service.ts

import { Injectable, OnDestroy } from "@angular/core";
import {
  createClient,
  RealtimeChannel,
  SupabaseClient,
} from "@supabase/supabase-js";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";

// --- Interfaces ---
export interface ParkingSpot {
  id: number;
  spot_name: string;
  status: "available" | "reserved" | "occupied";
}

export interface Message {
  id?: number;
  content: string;
  username: string;
  created_at?: string;
}

@Injectable({
  providedIn: "root",
})
export class SupabaseService implements OnDestroy {
  private supabase: SupabaseClient;

  // --- State for Parking Lot ---
  private spotsSubject = new BehaviorSubject<ParkingSpot[]>([]);
  private parkingChannel!: RealtimeChannel;
  spots$: Observable<ParkingSpot[]> = this.spotsSubject.asObservable();

  // --- State for Chat ---
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  private chatChannel!: RealtimeChannel;
  messages$: Observable<Message[]> = this.messagesSubject.asObservable();

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );

    console.log("Supabase service initialized. Setting up listeners...");
    this.fetchSpots();
    this.listenToParkingChanges();
    this.listenToMessages();
  }

  // --- Parking Lot Functionality ---

  /**
   * ดึงข้อมูลสถานะที่จอดรถทั้งหมดล่าสุด
   */
  async fetchSpots() {
    const { data, error } = await this.supabase
      .from("parking_spots")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching parking spots:", error);
    } else {
      this.spotsSubject.next(data as ParkingSpot[]);
    }
  }

  /**
   * ตั้งค่าการดักฟังการเปลี่ยนแปลงของตาราง parking_spots
   */
  private listenToParkingChanges() {
    this.parkingChannel = this.supabase
      .channel("parking-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "parking_spots" }, // ดักฟังทุก event (INSERT, UPDATE, DELETE)
        (payload) => {
          console.log("Parking spot change received!", payload);
          this.fetchSpots(); // เมื่อมีการเปลี่ยนแปลง ให้ดึงข้อมูลทั้งหมดมาใหม่
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("Successfully subscribed to parking updates!");
        }
      });
  }

  // --- Chat Functionality ---

  /**
   * ดึงข้อความแชททั้งหมดตอนเริ่มต้น
   */
  async fetchMessages() {
    const { data, error } = await this.supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
    } else {
      this.messagesSubject.next(data as Message[]);
    }
  }

  /**
   * ส่งข้อความใหม่
   */
  async sendMessage(message: Message) {
    const { error } = await this.supabase.from("messages").insert([message]);
    if (error) {
      console.error("Error sending message:", error);
    }
  }

  /**
   * ตั้งค่าการดักฟังข้อความใหม่ในตาราง messages
   */
  private listenToMessages() {
    this.chatChannel = this.supabase
      .channel("chat-room-public")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" }, // ดักฟังเฉพาะข้อความใหม่ (INSERT)
        (payload) => {
          console.log("New message received!", payload);
          const newMessage = payload.new as Message;
          const currentMessages = this.messagesSubject.getValue();
          this.messagesSubject.next([...currentMessages, newMessage]);
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("Successfully subscribed to chat room!");
        }
      });
  }

  // --- Lifecycle & Cleanup ---

  /**
   * ยกเลิกการเชื่อมต่อ Real-time ทั้งหมด
   */
  unsubscribeAll() {
    if (this.parkingChannel) {
      this.supabase.removeChannel(this.parkingChannel);
    }
    if (this.chatChannel) {
      this.supabase.removeChannel(this.chatChannel);
    }
    console.log("Unsubscribed from all real-time channels.");
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  async getParkingSpots() {
    const { data, error } = await this.supabase.from("parking_spots").select(
      "*",
    );
    if (error) throw error;
    return data;
  }
}
