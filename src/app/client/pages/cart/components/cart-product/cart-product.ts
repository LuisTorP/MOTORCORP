import { Component, Input } from '@angular/core';
import { Product } from '../../../products/interfaces/product.interface';

@Component({
  selector: 'cart-product',
  imports: [],
  templateUrl: './cart-product.html',
  styleUrl: './cart-product.scss',
})
export class CartProduct {
  @Input() product!: Product;
}
