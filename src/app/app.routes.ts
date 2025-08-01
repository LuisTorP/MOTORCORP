import { Routes } from '@angular/router';
import {
  isAdminGuard,
  isLoggedInGuard,
} from './client/pages/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'client',
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./client/client.routes').then(r => r.clientRoutes),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(r => r.adminRoutes),
    canActivate: [isLoggedInGuard, isAdminGuard],
  },
  {
    path: '**',
    redirectTo: 'client',
    pathMatch: 'full',
  },
];
