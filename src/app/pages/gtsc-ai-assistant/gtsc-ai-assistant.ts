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
import { AiAssistantService } from '../../service/ai-assistant.service';

@Component({
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
