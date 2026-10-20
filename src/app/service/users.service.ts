import { inject, Injector, runInInjectionContext, Service } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { UserProfile } from '../model/user-profile';

@Service()
export class UsersService {
  private readonly firestore = inject(Firestore);
  private readonly authService = inject(AuthService);
  private readonly injector = inject(Injector);

  // The signed-in person's users/{uid} doc. Follows log in / log out like the chat listener.
  // null = signed out (or not loaded yet), undefined = no users doc for this account.
  readonly profileSignal = toSignal(
    this.authService.user$.pipe(
      switchMap((user) =>
        user
          ? this.getProfile$(user.uid).pipe(
              catchError((error) => {
                console.error('Profile listener refused:', error);
                return of(null);
              }),
            )
          : of(null),
      ),
    ),
    { initialValue: null },
  );

  private getProfile$(uid: string) {
    return runInInjectionContext(
      this.injector,
      () => docData(doc(this.firestore, 'users', uid)) as Observable<UserProfile | undefined>,
    );
  }
}
