import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat-page.page';

describe('ChatPagePage', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
