import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { APP_ROUTES } from './constants/app-routes.constants';
import { Disciplines } from './pages/disciplines/disciplines';
import { JoinUs } from './pages/join-us/join-us';
import { RangeTimes } from './pages/range-times/range-times';
import { ContactUs } from './pages/contact-us/contact-us';
import { Login } from './pages/login/login';
import { ClubArea } from './pages/club-area/club-area';
import { authGuard } from './guards/auth-guard';
import { ChatRangeOfficers } from './pages/chat-range-officers/chat-range-officers';

export const routes: Routes = [
  { path: APP_ROUTES.home, component: Home },
  { path: APP_ROUTES.disciplines, component: Disciplines },
  { path: APP_ROUTES.rangeTimes, component: RangeTimes },
  { path: APP_ROUTES.join, component: JoinUs },
  { path: APP_ROUTES.contact, component: ContactUs },
  { path: APP_ROUTES.login, component: Login },
  { path: APP_ROUTES.clubArea, component: ClubArea, canActivate: [authGuard] },
  { path: APP_ROUTES.roChat, component: ChatRangeOfficers, canActivate: [authGuard] },
  { path: '**', redirectTo: APP_ROUTES.home },
];
