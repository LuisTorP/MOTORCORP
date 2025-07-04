import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ShippingDetails } from '../../components/shipping-details/shipping-details';

@Component({
  selector: 'shipping-page',
  imports: [ShippingDetails],
  templateUrl: './shipping-page.html',
  styleUrl: './shipping-page.scss',
})
export class ShippingPage {
  private cartService = inject(CartService);
  cartDetail = this.cartService.cartDetails;
}
