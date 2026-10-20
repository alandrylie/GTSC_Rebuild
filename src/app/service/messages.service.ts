import { inject, Service, Injector, runInInjectionContext } from '@angular/core';
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
import { Observable, catchError, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { ChatMessage, NewChatMessage } from '../model/chat-message';
import { toSignal } from '@angular/core/rxjs-interop';
import { serverTimestamp } from '@angular/fire/firestore';

@Service()
export class MessagesService {
  private readonly firestore = inject(Firestore);
  private readonly authService = inject(AuthService);
  private readonly injector = inject(Injector);
  private readonly messageCol = collection(this.firestore, 'roChat');

  getMessages$(): Observable<ChatMessage[]> {
    return runInInjectionContext(this.injector, () => {
      const q = query(this.messageCol, orderBy('createdAt', 'asc'));
      return collectionData(q, { idField: 'id' }) as Observable<ChatMessage[]>;
    });
  }
  // Restart the live listener whenever the signed-in user changes, so a
  // listener refused by the security rules (e.g. on log out) doesn't stay dead.
  readonly messageSignal = toSignal(
    this.authService.user$.pipe(
      switchMap((user) =>
        user
          ? this.getMessages$().pipe(
              catchError((error) => {
                console.error('Chat listener refused:', error);
                return of([]);
              }),
            )
          : of(null),
      ),
    ),
    { initialValue: null },
  );
  addChatMessage(message: NewChatMessage) {
    return runInInjectionContext(this.injector, () =>
      addDoc(this.messageCol, { ...message, createdAt: serverTimestamp() }),
    );
  }

  deleteChatMessage(id: string) {
    return runInInjectionContext(this.injector, () => deleteDoc(doc(this.messageCol, id)));
  }

  updateChatMessage(id: string, changes: Partial<NewChatMessage>) {
    return runInInjectionContext(this.injector, () => updateDoc(doc(this.messageCol, id), changes));
  }
}
