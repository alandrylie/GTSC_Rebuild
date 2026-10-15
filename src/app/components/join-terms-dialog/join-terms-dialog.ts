import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { JoinTermsDialogData } from '../../model/join-terms-dialog-data';

@Component({
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatCheckbox,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  selector: 'app-join-terms-dialog',
  styleUrl: './join-terms-dialog.css',
  templateUrl: './join-terms-dialog.html',
})
export class JoinTermsDialog {
  protected readonly data = inject<JoinTermsDialogData>(MAT_DIALOG_DATA);

  protected readonly agreements = new FormGroup({
    readTerms: new FormControl(false, { validators: [Validators.requiredTrue], nonNullable: true }),
    guardian: new FormControl(false, { validators: [Validators.requiredTrue], nonNullable: true }),
  });

  constructor() {
    if (!this.data.juniorsOnly) this.agreements.controls.guardian.disable();
  }
}
