import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ShippingService } from '../../services/shipping.service';

@Component({
  selector: 'payment-details',
  imports: [],
  templateUrl: './payment-details.html',
  styleUrl: './payment-details.scss',
})
export class PaymentDetails {
  private cartService = inject(CartService);
  private shippingService = inject(ShippingService);
  cartDetails = this.cartService.cartDetails;
  totalPrice = this.cartService.totalPrice;
  shippingMethod = this.shippingService.shippingMethod;
}
