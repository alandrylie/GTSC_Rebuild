import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatRangeOfficers } from './chat-range-officers';
import { signal } from '@angular/core';
import { MessagesService } from '../../service/messages.service';
import { AuthService } from '../../service/auth.service';

describe('ChatRangeOfficers', () => {
  let component: ChatRangeOfficers;
  let fixture: ComponentFixture<ChatRangeOfficers>;

  // Fake MessagesService so the test never talks to Firebase (null = still loading).
  // addChatMessage is a vi.fn() so each test can make it succeed or fail.
  const fakeMessagesService = {
    messageSignal: signal(null),
    addChatMessage: vi.fn(),
  };

  // Fake AuthService: a signed-in test RO
  const fakeAuthService = {
    userSignal: signal({ uid: 'test-uid', email: 'test.ro@gtsc.test' }),
  };

  beforeEach(async () => {
    // Start each test with a fresh fake, so one test can't affect the next
    fakeMessagesService.addChatMessage.mockReset();

    await TestBed.configureTestingModule({
      imports: [ChatRangeOfficers],
      providers: [
        { provide: MessagesService, useValue: fakeMessagesService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatRangeOfficers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('this should show and error if a message fails to sent', async () => {
    // Arrange
    fakeMessagesService.addChatMessage.mockRejectedValue(new Error('Firestore has imploded'));
    //Act
    await component.sendChatMessage('Hello I want to fail');
    //Assert
    expect(component.errorMessage()).toBe('Message failed to send try again later');
  });
});
