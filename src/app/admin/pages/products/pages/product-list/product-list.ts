import {
  Component,
  inject,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  Product,
  ProductType,
} from '../../../../../client/pages/products/interfaces/product.interface';
import { ProductService } from '../../../../../client/pages/products/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginator } from '../../../../components/paginator/paginator';
import { QueryDocumentSnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-product-list',
  imports: [Paginator],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit, OnChanges {
  search!: string;
  type = input<ProductType>();

  page = 1;
  isLastPage = false;
  lastDocs: (QueryDocumentSnapshot<Product> | undefined)[] = [];

  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  products = this.productService.products;

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      const newPage = +params['page'] || 1;
      const type = params['type'] as ProductType | undefined;
      const search = params['search'] || '';

      if (newPage > 1 && this.lastDocs.length < newPage - 1) {
        this.lastDocs = [];
        let lastDoc: QueryDocumentSnapshot<Product> | undefined = undefined;
        for (let i = 1; i < newPage; i++) {
          const result = await this.productService.getProducts(
            type,
            15,
            lastDoc
          );
          lastDoc = result.lastDoc;
          this.lastDocs[i - 1] = lastDoc;
          if (!lastDoc) break;
        }
      } else if (newPage < this.page) {
        this.lastDocs = this.lastDocs.slice(0, newPage);
      }
      const lastDoc = this.lastDocs[newPage - 2];
      const result = await this.productService.getProducts(type, 15, lastDoc);
      this.isLastPage = result.products.length < 15;

      if (result.products.length === 0 && newPage > 1) {
        this.onPageChange(newPage - 1);
        return;
      }

      if (newPage > this.page) {
        this.lastDocs[newPage - 1] = result.lastDoc;
      }

      this.page = newPage;

      if (search) {
        await this.productService.filterProducts(search);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['search'] && !changes['search'].isFirstChange()) {
      this.productService.filterProducts(this.search);
      this.lastDocs = [];
      this.page = 1;
    }
    if (changes['type'] && !changes['type'].isFirstChange()) {
      this.lastDocs = [];
      this.page = 1;
    }
  }

  onSearchChange(newTerm: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: newTerm, page: 1 },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
    this.lastDocs = [];
    this.page = 1;
  }

  onPageChange(newPage: number) {
    this.router.navigate([], {
      queryParams: { page: newPage },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
