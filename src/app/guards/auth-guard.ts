import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { map } from 'rxjs';
import { APP_ROUTES } from '../constants/app-routes.constants';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.user$.pipe(
    map((user) => (user ? true : router.createUrlTree(['/', APP_ROUTES.login]))),
  );
};
