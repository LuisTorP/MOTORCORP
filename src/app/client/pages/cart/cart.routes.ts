import { Routes } from '@angular/router';

export const cartRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/cart-page/cart-page').then((c) => c.CartPage),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./pages/checkout-page/checkout-page').then((c) => c.CheckoutPage),
  },
];
