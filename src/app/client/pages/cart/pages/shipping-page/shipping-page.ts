import { Component, inject } from '@angular/core';
import { PaymentDetails } from '../../components/payment-details/payment-details';
import { CartService } from '../../services/cart.service';
import { PaymentGuarantees } from '../../components/payment-guarantees/payment-guarantees';
import { PaymentBenefits } from '../../components/payment-benefits/payment-benefits';
import { ShippingDetails } from '../../components/shipping-details/shipping-details';

@Component({
  selector: 'shipping-page',
  imports: [
    PaymentDetails,
    PaymentGuarantees,
    PaymentBenefits,
    ShippingDetails,
  ],
  templateUrl: './shipping-page.html',
  styleUrl: './shipping-page.scss',
})
export class ShippingPage {
  private cartService = inject(CartService);
  cartDetail = this.cartService.cartDetails;
}
