import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CartProduct } from '../../components/cart-product/cart-product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../../products/services/product.service';
import { CartDetail } from '../../interfaces/cart.interface';
import { CartSummary } from '../../components/cart-summary/cart-summary';

@Component({
  selector: 'cart',
  imports: [CartProduct, CartSummary],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage {
  private cartService = inject(CartService);
  cartDetails = this.cartService.cartDetails;
}
