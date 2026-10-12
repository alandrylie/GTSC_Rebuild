import { Component, input, output } from '@angular/core';
import { ChatMessage } from '../../model/chat-message';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  imports: [DatePipe, MatButtonModule, MatIcon, MatMenuModule],
  selector: 'app-chat-message-row',
  styleUrl: './chat-message-row.css',
  templateUrl: './chat-message-row.html',
  // Adds class="mine" to <app-chat-message-row> when the signed-in user sent it
  host: { '[class.mine]': 'isMine()' },
})
export class ChatMessageRow {
  message = input.required<ChatMessage>();
  isMine = input(false);
  sendDelete = output<string>();
  // Sends the whole message up: the page needs the id to save and the text to fill the edit box
  sendEdit = output<ChatMessage>();

  deleteMessage() {
    this.sendDelete.emit(this.message().id);
  }

  editMessage() {
    this.sendEdit.emit(this.message());
  }
}
