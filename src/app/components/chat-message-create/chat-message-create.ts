import { Component, inject, output, viewChild } from '@angular/core';
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
import { BreakpointObserver } from '@angular/cdk/layout';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

@Component({
  // Only go red once the user has typed and cleared the box, not just on leaving it
  providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],
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
  // True on laptops/desktops (real mouse + keyboard), false on phones and tablets
  private readonly hasKeyboard = inject(BreakpointObserver).isMatched(
    '(hover: hover) and (pointer: fine)',
  );

  protected sendOnEnter(event: Event) {
    if (!this.hasKeyboard) return;
    event.preventDefault();
    this.submitMessage();
  }

  submitMessage() {
    if (this.chatMessageSend.invalid) return;
    this.sendMessage.emit(this.chatMessageSend.getRawValue().text.trim());
    this.formDirective().resetForm();
  }
}
