import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { APP_ROUTES } from './constants/app-routes.constants';

export const routes: Routes = [
  { path: APP_ROUTES.home, component: Home },
  { path: '**', redirectTo: APP_ROUTES.home },
];
