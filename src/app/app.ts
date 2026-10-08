import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClubInfoService } from './service/club-info.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('gtscRebuild');
  protected clubInfo = inject(ClubInfoService);
}
