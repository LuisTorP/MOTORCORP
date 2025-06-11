import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'moto',
  },
  {
    path: 'moto',
    loadComponent: () =>
      import('./pages/product-list/product-list').then((c) => c.ProductList),
    data: { type: 'moto' },
  },
  {
    path: 'accesorio',
    loadComponent: () =>
      import('./pages/product-list/product-list').then((c) => c.ProductList),
    data: { type: 'accesorio' },
  },
  {
    path: 'repuesto',
    loadComponent: () =>
      import('./pages/product-list/product-list').then((c) => c.ProductList),
    data: { type: 'repuesto' },
  },
  {
    path: ':productId',
    loadComponent: () =>
      import('./pages/product-description/product-description').then(
        (c) => c.ProductDescription
      ),
  },
];
