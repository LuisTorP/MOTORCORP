import { Component, inject } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { ShippingService } from '../../services/shipping.service';
import { AuthService } from '../../../auth/services/auth.service';
import { CartService } from '../../services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../../../../routes.constant';
import { CheckCircleIcon } from '../../../../../shared/components/icons/check-circle-icon/check-circle-icon';
import { MailingAddress } from '../../interfaces/shipping.interface';
import { ConfirmationCard } from '../../components/confirmation-card/confirmation-card';

@Component({
  selector: 'confirmation-page',
  imports: [CheckCircleIcon, RouterLink, ConfirmationCard],
  templateUrl: './confirmation-page.html',
  styleUrl: './confirmation-page.scss',
})
export class ConfirmationPage {
  private checkoutService = inject(CheckoutService);
  private authService = inject(AuthService);
  private shippingService = inject(ShippingService);
  private cartService = inject(CartService);
  private router = inject(Router);
  routes = APP_ROUTES;
  userSignal = this.authService.user;
  cartItemsSignal = this.cartService.products;
  cartDetails = this.cartService.cartDetails;
  shippingMethodSignal = this.shippingService.shippingMethod;
  shippingAddressSignal = this.shippingService.shippingAddress;
  paymentMethodSignal = this.shippingService.paymentMethod;

  getFormattedLocation(address: MailingAddress): string {
    const { departamento, provincia, distrito } = address;
    if (departamento === provincia) {
      return `${distrito}, ${departamento}`;
    } else if (provincia === distrito) {
      return `${distrito}, ${departamento}`;
    }
    return `${distrito}, ${provincia}, ${departamento}`;
  }

  async completePruchase() {
    const user = this.userSignal();
    const cartItems = this.cartItemsSignal();
    const shippingMethod = this.shippingMethodSignal();
    const shippingAddress = this.shippingAddressSignal();
    const paymentMethod = this.paymentMethodSignal();

    if (!user || cartItems.length === 0 || !shippingMethod || !paymentMethod)
      return;
    await this.checkoutService.registerSale(
      user.id,
      cartItems,
      shippingMethod,
      paymentMethod,
      shippingAddress
    );
    this.cartService.clearCart();
    this.shippingService.clearShippingMethod();
    this.shippingService.clearShippingAddress();
    this.shippingService.clearPaymentMethod();
    alert('compra exitosa');
    this.router.navigate([this.routes.client.home.root]);
  }
}
