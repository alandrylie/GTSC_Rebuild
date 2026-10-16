import { Component, input, computed } from '@angular/core';
import { DAY_NAMES } from '../../constants/day-name.constants';
import { Session } from '../../model/session';
import { ATTENDEE_LABELS } from '../../constants/attendee-labels.constants';

@Component({
  imports: [],
  selector: 'app-session-row',
  styleUrl: './session-row.css',
  templateUrl: './session-row.html',
})
export class SessionRow {
  readonly session = input.required<Session>();
  protected readonly dayNames = DAY_NAMES;
  protected readonly attendees = computed(() => {
    return this.session()
      .whoCanAttend.map((who) => ATTENDEE_LABELS[who] ?? who)
      .join(', ');
  });
  protected readonly timeText = computed(() => {
    const session = this.session();
    if (!session.start) return 'Any time';
    if (!session.end) return `From ${session.start}`;
    return `${session.start} - ${session.end}`;
  });
}
