import { inject, Service } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  orderBy,
  query,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatMessage, NewChatMessage } from '../model/chat-message';
import { toSignal } from '@angular/core/rxjs-interop';
import { serverTimestamp } from '@angular/fire/firestore';

@Service()
export class MessagesService {
  private readonly firestore = inject(Firestore);
  private readonly messageCol = collection(this.firestore, 'roChat');
  getMessages$(): Observable<ChatMessage[]> {
    const q = query(this.messageCol, orderBy('createdAt', 'asc'));
    return collectionData(q, { idField: 'id' }) as Observable<ChatMessage[]>;
  }
  messageSignal = toSignal(this.getMessages$(), { initialValue: null });
  addChatMessage(message: NewChatMessage) {
    return addDoc(this.messageCol, { ...message, createdAt: serverTimestamp() });
  }

  deleteChatMessage(id: string) {
    return deleteDoc(doc(this.messageCol, id));
  }

  updateChatMessage(id: string, changes: Partial<NewChatMessage>) {
    return updateDoc(doc(this.messageCol, id), changes);
  }
}
