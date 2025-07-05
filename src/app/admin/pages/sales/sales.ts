import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Paginator } from '../../components/paginator/paginator';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { Sale } from '../../../client/pages/cart/interfaces/sale.interface';
import { SalesService } from './services/sales.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sales',
  imports: [Paginator],
  templateUrl: './sales.html',
  styleUrl: './sales.scss',
})
export class Sales implements OnInit, OnChanges {
  @Input() search!: string;

  page = 1;
  isLastPage = false;
  lastDocs: (QueryDocumentSnapshot<Sale> | undefined)[] = [];

  showForm = false;

  private salesService = inject(SalesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  sales = this.salesService.sales;

  ngOnInit(): void {
    this.route.queryParams.subscribe(async params => {
      const newPage = +params['page'] || 1;
      const search = params['search'] || '';

      if (search) {
        const allSales: Sale[] = [];
        const filtered = allSales.filter(sale =>
          sale.userId.toLowerCase().includes(search.trim().toLowerCase())
        );
        this.salesService.sales.set(filtered);

        this.isLastPage = true;
        this.page = 1;
        this.lastDocs = [];
        return;
      }

      if (newPage > 1 && this.lastDocs.length < newPage - 1) {
        let lastDoc: QueryDocumentSnapshot<Sale> | undefined =
          this.lastDocs[this.lastDocs.length - 1];
        for (let i = this.lastDocs.length + 1; i < newPage; i++) {
          const result = await this.salesService.getSales(15, lastDoc);
          lastDoc = result.lastDoc;
          this.lastDocs[i - 1] = lastDoc;
          if (!lastDoc) break;
        }
      } else if (newPage < this.page) {
        this.lastDocs = this.lastDocs.slice(0, newPage);
      }
      const lastDoc = this.lastDocs[newPage - 2];
      const result = await this.salesService.getSales(15, lastDoc);
      this.isLastPage = result.sales.length < 15;

      if (result.sales.length === 0 && newPage > 1) {
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
      this.salesService.filterSales(this.search);
      this.isLastPage = true;
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
