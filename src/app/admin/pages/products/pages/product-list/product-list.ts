import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  Product,
  ProductType,
} from '../../../../../client/pages/products/interfaces/product.interface';
import { ProductService } from '../../../../../client/pages/products/services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Paginator } from '../../../../components/paginator/paginator';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { APP_ROUTES } from '../../../../../routes.constant';
import { ProductForm } from "./components/product-form/product-form";

@Component({
  selector: 'app-product-list',
  imports: [Paginator, RouterLink, ProductForm],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit, OnChanges {
  @Input() search!: string;
  @Input() type!: ProductType;

  routes = APP_ROUTES;

  page = 1;
  isLastPage = false;
  lastDocs: (QueryDocumentSnapshot<Product> | undefined)[] = [];

  showForm = false;

  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  products = this.productService.products;

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      const newPage = +params['page'] || 1;
      const type = params['type'] as ProductType | undefined;
      const search = params['search'] || '';

      if (search) {
        let allProducts: Product[] = [];
        if (type) {
          const result = await this.productService.getProducts(type, 1000);
          allProducts = result.products;
        } else {
          const result = await this.productService.getProducts(undefined, 1000);
          allProducts = result.products;
        }
        const filtered = allProducts.filter(product =>
          product.nombre.toLowerCase().includes(search.trim().toLowerCase())
        );
        this.productService.products.set(filtered);

        this.isLastPage = true;
        this.page = 1;
        this.lastDocs = [];
        return;
      }

      if (newPage > 1 && this.lastDocs.length < newPage - 1) {
        let lastDoc: QueryDocumentSnapshot<Product> | undefined =
          this.lastDocs[this.lastDocs.length - 1];
        for (let i = this.lastDocs.length + 1; i < newPage; i++) {
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
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['search'] && !changes['search'].isFirstChange()) {
      this.productService.filterProducts(this.search);
      this.isLastPage = true;
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

  async onDeleteProduct(productId: string) {
    try {
      await this.productService.deleteProduct(productId);
      location.reload();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  }
}
