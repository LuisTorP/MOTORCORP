import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CartProduct } from '../../components/cart-product/cart-product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../../products/services/product.service';
import { CartDetail } from '../../interfaces/cart.interface';

@Component({
  selector: 'cart',
  imports: [CartProduct],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage implements OnInit, OnDestroy {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  cartItems = this.cartService.products;
  cartDetails = this.cartService.cartDetails;

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.cartDetails.set([]);
  }

  async getProducts() {
    const items = this.cartItems();
    const products = await this.productService.getProductsByIds(items);
    const merged: CartDetail[] = products.map((product) => {
      const item = items.find((i) => i.id === product.id);
      return {
        ...product,
        quantity: item?.quantity || 1,
      };
    });
    this.cartDetails.set(merged);
  }
}
