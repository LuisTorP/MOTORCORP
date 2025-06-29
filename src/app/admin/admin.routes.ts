import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/admin-layout/admin-layout').then((c) => c.AdminLayout),
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('./pages/products/products.routes').then(
            (r) => r.productsRoutes
          ),
      },
      {
        path: 'sales',
        loadComponent: () => import('./pages/sales/sales').then((c) => c.Sales),
      },
      {
        path: '**',
        redirectTo: 'products',
        pathMatch: 'full',
      },
    ],
  },
];
