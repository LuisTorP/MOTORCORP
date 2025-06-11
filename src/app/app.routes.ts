import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((c) => c.Home),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((r) => r.authRoutes),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./pages/products/products.routes').then((r) => r.productRoutes),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((c) => c.About),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
