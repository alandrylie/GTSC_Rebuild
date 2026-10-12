import { Timestamp } from '@angular/fire/firestore';

export interface ChatMessage {
  text: string;
  authorUid: string;
  authorName: string;
  createdAt: Timestamp;
  id: string;
}
export type NewChatMessage = Omit<ChatMessage, 'createdAt' | 'id'>;
