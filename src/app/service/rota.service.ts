import { Injector, Service, inject, runInInjectionContext } from '@angular/core';
import { collection, collectionData, Firestore, query, orderBy } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { catchError, Observable, of, switchMap } from 'rxjs';

import { RotaSession } from '../model/rota-session';
import { toSignal } from '@angular/core/rxjs-interop';

@Service()
export class RotaService {
  private readonly firestore = inject(Firestore);
  private readonly authService = inject(AuthService);
  private readonly injector = inject(Injector);
  private readonly rotaCol = collection(this.firestore, 'roRota');

  getRota$(): Observable<RotaSession[]> {
    return runInInjectionContext(this.injector, () => {
      const q = query(this.rotaCol, orderBy('date', 'asc'));
      return collectionData(q, { idField: 'id' }) as Observable<RotaSession[]>;
    });
  }

  readonly rotaSignal = toSignal(
    this.authService.user$.pipe(
      switchMap((user) =>
        user
          ? this.getRota$().pipe(
              catchError((error) => {
                console.error('Rota listener refused:', error);
                return of([]);
              }),
            )
          : of(null),
      ),
    ),
    { initialValue: null },
  );
}
