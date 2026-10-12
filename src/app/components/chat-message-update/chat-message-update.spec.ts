import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatMessageUpdate } from './chat-message-update';

describe('ChatMessageUpdate', () => {
  let component: ChatMessageUpdate;
  let fixture: ComponentFixture<ChatMessageUpdate>;

  // Fake dialog ref: close is a vi.fn() so a test can check what the dialog closed with
  const fakeDialogRef = { close: vi.fn() };

  beforeEach(async () => {
    fakeDialogRef.close.mockReset();

    await TestBed.configureTestingModule({
      imports: [ChatMessageUpdate],
      providers: [
        // The old message text the page passes in when it opens the dialog
        { provide: MAT_DIALOG_DATA, useValue: 'See you at 7 tonight' },
        { provide: MatDialogRef, useValue: fakeDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatMessageUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
