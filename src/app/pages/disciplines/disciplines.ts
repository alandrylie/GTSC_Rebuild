import { Component, inject } from '@angular/core';
import { DisciplineCard } from '../../components/discipline-card/discipline-card';
import { ClubInfoService } from '../../service/club-info.service';

@Component({
  imports: [DisciplineCard],
  selector: 'app-disciplines',
  styleUrl: './disciplines.css',
  templateUrl: './disciplines.html',
})
export class Disciplines {
  protected readonly clubInfo = inject(ClubInfoService);
}
