import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { ClubAreaLink } from '../../model/club-area-link';

@Component({
  imports: [RouterLink, MatCardModule, MatIcon],
  selector: 'app-club-area-card',
  styleUrl: './club-area-card.css',
  templateUrl: './club-area-card.html',
})
export class ClubAreaCard {
  readonly link = input.required<ClubAreaLink>();
}
