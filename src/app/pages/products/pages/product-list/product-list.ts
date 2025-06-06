import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CardProduct } from '../../components/card-product/card-product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CardProduct],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit, OnChanges {
  @Input() search!: string;

  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  products = this.productService.products;

  ngOnInit(): void {
    this.productService.getProducts().then(() => {
      if (this.search) {
        this.productService.filterProducts(this.search);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['search'] && !changes['search'].isFirstChange()) {
      this.productService.filterProducts(this.search);
    }
  }

  onSearchChange(newTerm: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: newTerm },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
