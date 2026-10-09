import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { APP_ROUTES } from './constants/app-routes.constants';
import { Disciplines } from './pages/disciplines/disciplines';
import { JoinUs } from './pages/join-us/join-us';
import { RangeTimes } from './pages/range-times/range-times';
import { ContactUs } from './pages/contact-us/contact-us';

export const routes: Routes = [
  { path: APP_ROUTES.home, component: Home },
  { path: APP_ROUTES.disciplines, component: Disciplines },
  { path: APP_ROUTES.rangeTimes, component: RangeTimes },
  { path: APP_ROUTES.join, component: JoinUs },
  { path: APP_ROUTES.contact, component: ContactUs },
  { path: '**', redirectTo: APP_ROUTES.home },
];
