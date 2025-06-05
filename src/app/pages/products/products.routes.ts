import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./product-list/product-list').then((c) => c.ProductList),
  },
  {
    path: ':courseId',
    loadComponent: () =>
      import('./product-description/product-description').then(
        (c) => c.ProductDescription
      ),
  },
];
