import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialog } from './confirm-dialog';

describe('ConfirmDialog', () => {
  let fixture: ComponentFixture<ConfirmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialog],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { title: 'Log out?', message: 'Are you sure?', confirmText: 'Log out' },
        },
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialog);
    await fixture.whenStable();
  });

  it('should show the title passed in', () => {
    const title: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(title.textContent).toContain('Log out?');
  });
});
