import { CanActivateFn, Router } from '@angular/router';
import { APP_ROUTES } from '../../../../routes.constant';
import { inject } from '@angular/core';
import { ShippingService } from '../services/shipping.service';
import { CartService } from '../services/cart.service';

const routes = APP_ROUTES;

export const cartProductsGuard: CanActivateFn = () => {
  const router = inject(Router);
  const cartService = inject(CartService);
  const cartItems = cartService.products();
  if (cartItems.length > 0) return true;
  router.navigate([routes.client.cart.root]);
  return false;
};

export const shippingMethodGuard: CanActivateFn = () => {
  const router = inject(Router);
  const shippingService = inject(ShippingService);
  const shippingMethod = shippingService.shippingMethod();
  if (shippingMethod) return true;
  router.navigate([routes.client.cart.checkout.shipping]);
  return false;
};

export const shippingAddressGuard: CanActivateFn = () => {
  const router = inject(Router);
  const shippingService = inject(ShippingService);
  const shippingMethod = shippingService.shippingMethod();
  const shippingAddress = shippingService.shippingAddress();
  if (shippingMethod?.price === 0) return true;
  if (shippingAddress) return true;
  router.navigate([routes.client.cart.checkout.shipping]);
  return false;
};

export const paymentMethodGuard: CanActivateFn = () => {
  const router = inject(Router);
  const shippingService = inject(ShippingService);
  const paymentMethod = shippingService.paymentMethod();
  if (paymentMethod) return true;
  router.navigate([routes.client.cart.checkout.payment]);
  return false;
};
