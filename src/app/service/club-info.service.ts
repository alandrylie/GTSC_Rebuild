import { inject, Service } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Schedule } from '../model/schedule';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { Committee } from '../model/committee';

@Service()
export class ClubInfoService {
  private readonly firestore = inject(Firestore);
  private readonly clubScheduleRef = doc(this.firestore, 'clubInfo/schedule');
  readonly clubSchedule$ = docData(this.clubScheduleRef) as Observable<Schedule>;
  private readonly clubCommitteeRef = doc(this.firestore, 'clubInfo/committee');
  readonly clubCommittee$ = docData(this.clubCommitteeRef) as Observable<Committee>;

  scheduleSignal = toSignal(this.clubSchedule$);
  committeeSignal = toSignal(this.clubCommittee$);
}
