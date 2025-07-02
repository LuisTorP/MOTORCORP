import { Component, inject } from '@angular/core';
import { CartProduct } from '../../components/cart-product/cart-product';
import { CartService } from '../../services/cart.service';
import { CartSummary } from '../../components/cart-summary/cart-summary';
import { PaymentBenefits } from '../../components/payment-benefits/payment-benefits';
import { PaymentGuarantees } from '../../components/payment-guarantees/payment-guarantees';
import { RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../../../../routes.constant';

@Component({
  selector: 'cart',
  imports: [CartProduct, CartSummary, PaymentGuarantees, RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage {
  private cartService = inject(CartService);
  cartDetails = this.cartService.cartDetails;
  routes = APP_ROUTES;
}
