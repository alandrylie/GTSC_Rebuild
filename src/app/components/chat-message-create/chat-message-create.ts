import { Component, output, viewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  ],
  selector: 'app-chat-message-create',
  styleUrl: './chat-message-create.css',
  templateUrl: './chat-message-create.html',
})
export class ChatMessageCreate {
  private readonly formDirective = viewChild.required(FormGroupDirective);
  chatMessageSend = new FormGroup({
    text: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(500), Validators.pattern(/\S/)],
      nonNullable: true,
    }),
  });
  sendMessage = output<string>();

  submitMessage() {
    if (this.chatMessageSend.invalid) return;
    this.sendMessage.emit(this.chatMessageSend.getRawValue().text.trim());
    this.formDirective().resetForm();
  }
}
