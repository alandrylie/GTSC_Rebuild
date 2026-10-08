import { inject, Service } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, user, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Service()
export class AuthService {
  private readonly firebaseAuth = inject(Auth);
  private readonly user$ = user(this.firebaseAuth);
  userSignal = toSignal(this.user$);
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }
  logout() {
    return signOut(this.firebaseAuth);
  }
}
