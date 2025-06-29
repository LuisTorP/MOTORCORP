import { Routes } from '@angular/router';

export const productsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./product-list/product-list').then((c) => c.ProductList),
  },
  {
    path: ':productId',
    loadComponent: () =>
      import('./product-description/product-description').then(
        (c) => c.ProductDescription
      ),
  },
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full',
  },
];
