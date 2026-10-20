import { inject, Injector, runInInjectionContext, Service } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, user, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Service()
export class AuthService {
  private readonly firebaseAuth = inject(Auth);
  private readonly injector = inject(Injector);
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
}
