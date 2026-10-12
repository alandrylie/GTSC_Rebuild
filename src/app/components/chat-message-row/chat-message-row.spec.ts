import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatMessageRow } from './chat-message-row';
import { ChatMessage } from '../../model/chat-message';

// A sample message for the required input (createdAt isn't shown yet, so a stand-in is fine)
const sampleMessage = {
  id: 'msg1',
  text: 'Can someone swap with me on Sunday?',
  authorUid: 'abc123',
  authorName: 'Test M.',
  createdAt: null,
} as unknown as ChatMessage;

describe('ChatMessageRow', () => {
  let component: ChatMessageRow;
  let fixture: ComponentFixture<ChatMessageRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatMessageRow],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatMessageRow);
    component = fixture.componentInstance;
    // Required inputs must be set before the component renders
    fixture.componentRef.setInput('message', sampleMessage);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
