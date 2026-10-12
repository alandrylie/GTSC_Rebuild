import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CdkTextareaAutosize,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  selector: 'app-chat-message-update',
  styleUrl: './chat-message-update.css',
  templateUrl: './chat-message-update.html',
})
export class ChatMessageUpdate {
  protected readonly data = inject<string>(MAT_DIALOG_DATA);
  updateChatMessage = new FormGroup({
    text: new FormControl(this.data, {
      validators: [Validators.required, Validators.maxLength(500), Validators.pattern(/\S/)],
      nonNullable: true,
    }),
  });

  // The dialog's own handle, so it can close itself and hand back the new text
  private readonly dialogRef = inject<MatDialogRef<ChatMessageUpdate, string>>(MatDialogRef);

  // The box's text as a signal, so isUnchanged() updates as the RO types
  private readonly text = toSignal(this.updateChatMessage.controls.text.valueChanges, {
    initialValue: this.data,
  });

  // True while the text matches the original, so Update stays disabled
  protected readonly isUnchanged = computed(() => this.text().trim() === this.data.trim());

  submitUpdate() {
    if (this.updateChatMessage.invalid || this.isUnchanged()) return;
    this.dialogRef.close(this.updateChatMessage.getRawValue().text.trim());
  }
}
