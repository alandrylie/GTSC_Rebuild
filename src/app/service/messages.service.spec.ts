import { TestBed } from '@angular/core/testing';
import { MessagesService } from './messages.service';
import { of } from 'rxjs';
import { Firestore, addDoc, serverTimestamp } from '@angular/fire/firestore';

vi.mock('@angular/fire/firestore', () => ({
  Firestore: class {},
  collection: vi.fn(() => 'messageRef'),
  query: vi.fn(),
  orderBy: vi.fn(),
  collectionData: vi.fn(() => of([])),
  addDoc: vi.fn(),
  serverTimestamp: vi.fn(),
}));
describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Firestore, useValue: {} }],
    });

    service = TestBed.inject(MessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should create a new chat message and send it to Firestore', () => {
    const newChatMessage = {
      text: 'I cant make next week can someone swap',
      authorUid: '123abc',
      authorName: 'Test M.',
    };
    service.addChatMessage(newChatMessage);
    expect(addDoc).toHaveBeenCalledWith('messageRef', {
      ...newChatMessage,
      createdAt: serverTimestamp(),
    });
  });
});
