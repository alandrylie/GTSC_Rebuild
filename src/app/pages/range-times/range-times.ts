import { Component, inject, computed } from '@angular/core';
import { ClubInfoService } from '../../service/club-info.service';

import { sortSessions } from '../../helpers/sort-sessions';
import { SessionRow } from '../../components/session-row/session-row';

@Component({
  imports: [SessionRow],
  selector: 'app-range-times',
  styleUrl: './range-times.css',
  templateUrl: './range-times.html',
})
export class RangeTimes {
  protected readonly clubInfo = inject(ClubInfoService);

  protected readonly sessions = computed(() => {
    const schedule = this.clubInfo.scheduleSignal();
    if (!schedule) return null;
    return sortSessions(schedule.sessions);
  });
}
