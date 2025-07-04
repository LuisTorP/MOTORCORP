import { Routes } from '@angular/router';
import {
  paymentMethodGuard,
  shippingAddressGuard,
  shippingMethodGuard,
} from './guards/checkout.guard';

export const cartRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/cart-layout/cart-layout').then(c => c.CartLayout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/cart-page/cart-page').then(c => c.CartPage),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./layout/checkout-layout/checkout-layout').then(
            c => c.CheckoutLayout
          ),
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'shipping',
          },
          {
            path: 'shipping',
            loadComponent: () =>
              import('./pages/shipping-page/shipping-page').then(
                c => c.ShippingPage
              ),
          },
          {
            path: 'payment',
            loadComponent: () =>
              import('./pages/payment-page/payment-page').then(
                c => c.PaymentPage
              ),
            canActivate: [shippingMethodGuard, shippingAddressGuard],
          },
          {
            path: 'confirmation',
            loadComponent: () =>
              import('./pages/confirmation-page/confirmation-page').then(
                c => c.ConfirmationPage
              ),
            canActivate: [
              shippingMethodGuard,
              shippingAddressGuard,
              paymentMethodGuard,
            ],
          },
        ],
      },
    ],
  },
];
