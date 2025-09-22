// src/app/components/chat/chat.component.ts
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { SupabaseService, Message } from '../../services/supabase.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule, IonicModule],
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, AfterViewChecked {
  @ViewChild('messageArea') private messageArea!: ElementRef;
  @ViewChild('messageInput') private messageInput!: ElementRef;

  messages$!: Observable<Message[]>;
  username: string = '';
  newMessage: string = '';

  constructor(private supabaseService: SupabaseService) { }

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
  quickMessage(emoji: string) {
    this.newMessage = emoji;
    this.sendMessage();
  }
  private scrollToBottom(): void {
    try {
      this.messageArea.nativeElement.scrollTop = this.messageArea.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
