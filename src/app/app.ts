import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClubInfoService } from './service/club-info.service';
import { Navigation } from './nav/navigation/navigation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected clubInfo = inject(ClubInfoService);
}
