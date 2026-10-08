import { inject, Service } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Schedule } from '../model/schedule';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Service()
export class ClubInfoService {
  private readonly firestore = inject(Firestore);
  private readonly clubScheduleRef = doc(this.firestore, 'clubInfo/schedule');
  private readonly clubSchedule$ = docData(this.clubScheduleRef) as Observable<Schedule>;

  scheduleSignal = toSignal(this.clubSchedule$);
}
