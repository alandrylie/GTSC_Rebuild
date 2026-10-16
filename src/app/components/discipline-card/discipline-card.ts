import { Component, input } from '@angular/core';
import { Discipline } from '../../model/discipline';

@Component({
  imports: [],
  selector: 'app-discipline-card',
  styleUrl: './discipline-card.css',
  templateUrl: './discipline-card.html',
})
export class DisciplineCard {
  readonly discipline = input.required<Discipline>();
}
