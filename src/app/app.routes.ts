import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { APP_ROUTES } from './constants/app-routes.constants';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: APP_ROUTES.home, component: Home },
  {
    path: APP_ROUTES.disciplines,
    loadComponent: () => import('./pages/disciplines/disciplines').then((m) => m.Disciplines),
  },
  {
    path: APP_ROUTES.rangeTimes,
    loadComponent: () => import('./pages/range-times/range-times').then((m) => m.RangeTimes),
  },
  {
    path: APP_ROUTES.join,
    loadComponent: () => import('./pages/join-us/join-us').then((m) => m.JoinUs),
  },
  {
    path: APP_ROUTES.contact,
    loadComponent: () => import('./pages/contact-us/contact-us').then((m) => m.ContactUs),
  },
  {
    path: APP_ROUTES.login,
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: APP_ROUTES.clubArea,
    loadComponent: () => import('./pages/club-area/club-area').then((m) => m.ClubArea),
    canActivate: [authGuard],
  },
  {
    path: APP_ROUTES.roChat,
    loadComponent: () =>
      import('./pages/chat-range-officers/chat-range-officers').then((m) => m.ChatRangeOfficers),
    canActivate: [authGuard],
  },
  {
    path: APP_ROUTES.askQuestion,
    loadComponent: () =>
      import('./pages/gtsc-ai-assistant/gtsc-ai-assistant').then((m) => m.GtscAiAssistant),
  },
  { path: '**', redirectTo: APP_ROUTES.home },
];
