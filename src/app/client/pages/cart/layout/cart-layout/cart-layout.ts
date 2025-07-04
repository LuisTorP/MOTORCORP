import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../../products/services/product.service';
import { CartDetail } from '../../interfaces/cart.interface';

@Component({
  selector: 'cart-layout',
  imports: [RouterOutlet],
  templateUrl: './cart-layout.html',
  styleUrl: './cart-layout.scss',
})
export class CartLayout implements OnInit, OnDestroy {
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
    const merged: CartDetail[] = products.map(product => {
      const item = items.find(i => i.id === product.id);
      return {
        ...product,
        quantity: item?.quantity || 1,
      };
    });
    this.cartDetails.set(merged);
  }
}
