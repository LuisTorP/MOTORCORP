import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ShippingService } from '../../services/shipping.service';

@Component({
  selector: 'cart-summary',
  imports: [CommonModule],
  templateUrl: './cart-summary.html',
  styleUrl: './cart-summary.scss',
})
export class CartSummary {
  private cartService = inject(CartService);
  private shippingService = inject(ShippingService);
  detail = this.cartService.cartDetails;
  totalPrice = this.cartService.totalPrice;
  totalItems = this.cartService.totalItems;
  shippingMethod = this.shippingService.shippingMethod;
}
