import { Component, computed, inject, signal } from '@angular/core';
import { MessagesService } from '../../service/messages.service';
import { AuthService } from '../../service/auth.service';
import { ChatMessageRow } from '../../components/chat-message-row/chat-message-row';
import { ChatMessageCreate } from '../../components/chat-message-create/chat-message-create';
import { ChatMessage, NewChatMessage } from '../../model/chat-message';
import { ConfirmDialogData } from '../../model/confirm-dialog-data';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { ChatMessageUpdate } from '../../components/chat-message-update/chat-message-update';

@Component({
  imports: [ChatMessageRow, ChatMessageCreate],
  selector: 'app-chat-range-officers',
  styleUrl: './chat-range-officers.css',
  templateUrl: './chat-range-officers.html',
})
export class ChatRangeOfficers {
  private readonly chatMessageService = inject(MessagesService);
  private readonly auth = inject(AuthService);
  protected readonly chatMessages = this.chatMessageService.messageSignal;
  // The signed-in user's uid, so each row knows whether it's "mine"
  protected readonly currentUid = computed(() => this.auth.userSignal()?.uid);
  private readonly dialog = inject(MatDialog);
  errorMessage = signal('');
  async sendChatMessage(message: string) {
    const user = this.auth.userSignal();
    if (!user || !user.email) return;
    const newMessage: NewChatMessage = {
      text: message,
      authorUid: user.uid,
      authorName: user.email,
    };
    try {
      this.errorMessage.set('');
      await this.chatMessageService.addChatMessage(newMessage);
    } catch (error) {
      console.error(error);
      this.errorMessage.set('Message failed to send try again later');
    }
  }

  async sendDeleteChatMessage(id: string) {
    try {
      this.errorMessage.set('');
      const data: ConfirmDialogData = {
        title: 'Delete message',
        message: 'Your message will be permanently deleted',
        confirmText: 'Delete message',
      };
      const dialogRef = this.dialog.open(ConfirmDialog, { data });
      const confirmed = await firstValueFrom(dialogRef.afterClosed());
      if (!confirmed) return;

      await this.chatMessageService.deleteChatMessage(id);
    } catch (error) {
      console.error(error);
      this.errorMessage.set('Message failed to delete try again later');
    }
  }

  // Opens the edit pop-up with the old text; saves only if it closes with new text
  async sendEditChatMessage(message: ChatMessage) {
    try {
      this.errorMessage.set('');
      const dialogRef = this.dialog.open<ChatMessageUpdate, string, string>(ChatMessageUpdate, {
        data: message.text,
      });
      const newText = await firstValueFrom(dialogRef.afterClosed());
      if (!newText) return; // Cancel or clicked outside: nothing to save

      await this.chatMessageService.updateChatMessage(message.id, { text: newText });
    } catch (error) {
      console.error(error);
      this.errorMessage.set('Message failed to update try again later');
    }
  }
}
