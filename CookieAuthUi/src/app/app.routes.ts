import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'sign-in',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./modules/sign-in/sign-in.component').then((m) => m.SignInComponent),
  },
  {
    path: 'sign-up',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./modules/sign-up/sign-up.component').then((m) => m.SignUpComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'sign-out',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./modules/sign-out/sign-out.component').then((m) => m.SignOutComponent),
  },
  { path: '**', redirectTo: 'dashboard' },
];
