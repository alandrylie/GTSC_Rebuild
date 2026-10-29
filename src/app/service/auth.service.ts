import { DOCUMENT, inject, Injector, runInInjectionContext, Service } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  user,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  validatePassword,
  confirmPasswordReset,
} from '@angular/fire/auth';
import { catchError, from, map, Observable, of } from 'rxjs';
import { APP_ROUTES } from '../constants/app-routes.constants';
import { RESET_PASSWORD_ERRORS } from '../constants/reset-password-errors.constants';
import { resetErrorMessage } from '../helpers/reset-error-message';
import { ResetLinkCheck } from '../model/reset-link-check';

@Service()
export class AuthService {
  private readonly firebaseAuth = inject(Auth);
  private readonly injector = inject(Injector);
  private readonly document = inject(DOCUMENT);
  readonly user$ = user(this.firebaseAuth);
  userSignal = toSignal(this.user$);
  login(email: string, password: string) {
    return runInInjectionContext(this.injector, () =>
      signInWithEmailAndPassword(this.firebaseAuth, email, password),
    );
  }
  logout() {
    return runInInjectionContext(this.injector, () => signOut(this.firebaseAuth));
  }
  resetPassword(email: string) {
    return runInInjectionContext(this.injector, () =>
      sendPasswordResetEmail(this.firebaseAuth, email, {
        // Firebase's "Password changed" page shows a Continue button back to our login page
        url: `${this.document.location.origin}/${APP_ROUTES.login}`,
      }),
    );
  }
  // Checks the code from the reset email link. Gives the member's email, or an error message.
  checkResetLink(code: string): Observable<ResetLinkCheck> {
    if (!code) return of({ email: '', error: RESET_PASSWORD_ERRORS['auth/invalid-action-code'] });
    return from(
      runInInjectionContext(this.injector, () => verifyPasswordResetCode(this.firebaseAuth, code)),
    ).pipe(
      map((email) => ({ email, error: '' })),
      catchError((error) => of({ email: '', error: resetErrorMessage(error) })),
    );
  }
  // Checks a password against the policy set in the Firebase console
  checkPassword(password: string) {
    return runInInjectionContext(this.injector, () =>
      validatePassword(this.firebaseAuth, password),
    );
  }
  confirmNewPassword(code: string, password: string) {
    return runInInjectionContext(this.injector, () =>
      confirmPasswordReset(this.firebaseAuth, code, password),
    );
  }
}
