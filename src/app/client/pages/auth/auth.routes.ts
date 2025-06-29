import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page').then((c) => c.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register-page/register-page').then((c) => c.RegisterPage),
  },
];
