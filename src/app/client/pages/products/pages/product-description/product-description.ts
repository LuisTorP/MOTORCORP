import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { CardProduct } from '../../components/card-product/card-product';

@Component({
  selector: 'app-product-description',
  imports: [CardProduct],
  templateUrl: './product-description.html',
  styleUrl: './product-description.scss',
})
export class ProductDescription implements OnInit, OnChanges {
  @Input() productId!: string;

  private productService = inject(ProductService);

  product = signal<Product | null>(null);
  randomProducts = this.productService.randomProducts;

  ngOnInit(): void {
    this.getProduct(this.productId);
    this.productService
      .getProducts()
      .then(() => this.productService.getRandomProducts(4));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId'] && !changes['productId'].isFirstChange()) {
      this.getProduct(this.productId);
      window.scrollTo({
        top: 0,
        behavior: 'instant',
      });
      this.productService.getRandomProducts(4);
    }
  }

  async getProduct(id: string) {
    const product = await this.productService.getProductById(this.productId);
    this.product.set(product);
  }
}
