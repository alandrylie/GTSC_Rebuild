import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClubInfoService } from './service/club-info.service';
import { Navigation } from './layout/navigation/navigation';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected clubInfo = inject(ClubInfoService);
}
