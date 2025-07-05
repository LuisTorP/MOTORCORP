import { inject, Injectable, signal } from '@angular/core';
import {
  DocumentData,
  Firestore,
  QueryDocumentSnapshot,
  query,
  Query,
  limit,
  startAfter,
  getDocs,
  collection,
  CollectionReference,
} from '@angular/fire/firestore';
import { Sale } from '../../../../client/pages/cart/interfaces/sale.interface';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private firestore = inject(Firestore);
  productsCollection = collection(
    this.firestore,
    'ventas'
  ) as CollectionReference<Sale>;
  sales = signal<Sale[]>([]);
  allSales = signal<Sale[]>([]);

  async getSales(pageSize = 40, lastDoc?: QueryDocumentSnapshot<Sale>) {
    let q: Query<Sale, DocumentData> = this.productsCollection;
    q = query(q, limit(pageSize));
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }
    const data = await getDocs(q);
    const sales = [...data.docs.map(d => ({ ...d.data(), id: d.id }))];
    this.sales.set(sales);
    this.allSales.set(sales);
    return {
      sales,
      lastDoc: data.docs[data.docs.length - 1] as
        | QueryDocumentSnapshot<Sale>
        | undefined,
    };
  }

  async filterSales(term?: string) {
    if (!term || term.trim() === '') {
      this.sales.set(this.allSales());
      return;
    }
    const filtered = this.allSales().filter(sale =>
      sale.userId.toLowerCase().includes(term.trim().toLowerCase())
    );
    this.sales.set(filtered);
  }
}
