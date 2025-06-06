import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/product-list/product-list').then((c) => c.ProductList),
  },
  {
    path: ':productId',
    loadComponent: () =>
      import('./pages/product-description/product-description').then(
        (c) => c.ProductDescription
      ),
  },
];
