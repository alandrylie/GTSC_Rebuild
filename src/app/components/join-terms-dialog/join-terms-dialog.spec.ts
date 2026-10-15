import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JoinTermsDialog } from './join-terms-dialog';

describe('JoinTermsDialog', () => {
  let component: JoinTermsDialog;
  let fixture: ComponentFixture<JoinTermsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinTermsDialog],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { juniorsOnly: false } },
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JoinTermsDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
