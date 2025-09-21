// src/app/components/chat/chat.component.ts
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { SupabaseService, Message } from '../../services/supabase.service';

@Component({
  selector: 'app-chat',
  standalone: true, // <-- ทำเป็น standalone component
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './chat-page.page.html',
  styleUrls: ['./chat-page.page.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messageArea') private messageArea!: ElementRef;
  @ViewChild('messageInput') private messageInput!: ElementRef;

  messages$!: Observable<Message[]>;
  username: string = '';
  newMessage: string = '';

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.messages$ = this.supabaseService.messages$;
    this.supabaseService.fetchMessages();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage(): void {
    if (!this.username.trim() || !this.newMessage.trim()) {
      alert('Please enter your name and a message.');
      return;
    }

    const message: Message = {
      username: this.username.trim(),
      content: this.newMessage.trim(),
    };

    this.supabaseService.sendMessage(message);
    this.newMessage = '';
  }

  focusMessageInput(): void {
    this.messageInput.nativeElement.focus();
  }

  private scrollToBottom(): void {
    try {
      this.messageArea.nativeElement.scrollTop = this.messageArea.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
