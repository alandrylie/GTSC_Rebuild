import { Component, inject, signal, viewChild } from '@angular/core';
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
import { AiAssistantService } from '../../service/ai-assistant.service';

@Component({
  // Only go red once the visitor has typed and cleared the box, not just on leaving it
  providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CdkTextareaAutosize,
  ],
  selector: 'app-gtsc-ai-assistant',
  styleUrl: './gtsc-ai-assistant.css',
  templateUrl: './gtsc-ai-assistant.html',
})
export class GtscAiAssistant {
  protected readonly aiService = inject(AiAssistantService);
  aiQuestion = new FormGroup({
    questionText: new FormControl('', {
      validators: [Validators.required, Validators.pattern(/\S/)],
      nonNullable: true,
    }),
  });
  conversation = signal<{ from: 'visitor' | 'assistant'; text: string }[]>([]);
  aiThinking = signal(false);
  private readonly formDirective = viewChild.required(FormGroupDirective);
  // True on laptops/desktops (real mouse + keyboard), false on phones and tablets
  private readonly hasKeyboard = inject(BreakpointObserver).isMatched(
    '(hover: hover) and (pointer: fine)',
  );

  protected sendOnEnter(event: Event) {
    if (!this.hasKeyboard) return;
    event.preventDefault();
    if (this.aiThinking()) return;
    this.sendQuestion();
  }

  async sendQuestion() {
    if (this.aiQuestion.invalid) return;
    const question = this.aiQuestion.getRawValue().questionText.trim();
    this.conversation.update((list) => [...list, { from: 'visitor', text: question }]);
    this.formDirective().resetForm();
    this.aiThinking.set(true);
    try {
      const reply = await this.aiService.askGemini(question);
      if (!reply) return;
      this.conversation.update((list) => [...list, { from: 'assistant', text: reply }]);
    } catch {
      this.conversation.update((list) => [
        ...list,
        {
          from: 'assistant',
          text: 'Sorry, I am unable to answer that right now. Please try later.',
        },
      ]);
    } finally {
      this.aiThinking.set(false);
    }
  }
}
