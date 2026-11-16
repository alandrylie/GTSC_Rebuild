import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { APP_ROUTES } from './constants/app-routes.constants';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: APP_ROUTES.home, component: Home, title: 'Home | G.T.S.C' },
  {
    path: APP_ROUTES.disciplines,
    loadComponent: () => import('./pages/disciplines/disciplines').then((m) => m.Disciplines),
    title: 'Disciplines | G.T.S.C',
  },
  {
    path: APP_ROUTES.rangeTimes,
    loadComponent: () => import('./pages/range-times/range-times').then((m) => m.RangeTimes),
    title: 'Range Times |  G.T.S.C',
  },
  {
    path: APP_ROUTES.join,
    loadComponent: () => import('./pages/join-us/join-us').then((m) => m.JoinUs),
    title: 'Join us | G.T.S.C',
  },
  {
    path: APP_ROUTES.contact,
    loadComponent: () => import('./pages/contact-us/contact-us').then((m) => m.ContactUs),
    title: 'Contact Us | G.T.S.C',
  },
  {
    path: APP_ROUTES.login,
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
    title: 'Members login | G.T.S.C',
  },
  {
    path: APP_ROUTES.forgotPassword,
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password').then((m) => m.ForgotPassword),
    title: 'Forgot password | G.T.S.C',
  },
  {
    path: APP_ROUTES.resetPassword,
    loadComponent: () =>
      import('./pages/reset-password/reset-password').then((m) => m.ResetPassword),
    title: 'Reset password | G.T.S.C',
  },
  {
    path: APP_ROUTES.clubArea,
    loadComponent: () => import('./pages/club-area/club-area').then((m) => m.ClubArea),
    canActivate: [authGuard],
    title: 'Club area | G.T.S.C',
  },
  {
    path: APP_ROUTES.roChat,
    loadComponent: () =>
      import('./pages/chat-range-officers/chat-range-officers').then((m) => m.ChatRangeOfficers),
    canActivate: [authGuard],
    title: 'Ro chat | G.T.S.C',
  },
  {
    path: APP_ROUTES.askQuestion,
    loadComponent: () =>
      import('./pages/gtsc-ai-assistant/gtsc-ai-assistant').then((m) => m.GtscAiAssistant),
    title: 'AI chat bot | G.T.S.C',
  },
  { path: '**', redirectTo: APP_ROUTES.home },
];
