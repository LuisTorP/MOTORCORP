import { Routes } from '@angular/router';

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
  },
  {
    path: '**',
    redirectTo: 'client',
    pathMatch: 'full',
  },
];
