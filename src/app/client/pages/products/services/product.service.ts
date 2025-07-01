import { inject, Injectable, signal } from '@angular/core';
import {
  collection,
  CollectionReference,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  Query,
  QueryDocumentSnapshot,
  serverTimestamp,
  setDoc,
  startAfter,
  startAt,
  where,
} from 'firebase/firestore';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Product, ProductType } from '../interfaces/product.interface';
import { CartItem } from '../../cart/interfaces/cart.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private firestore = inject(Firestore);
  productsCollection = collection(
    this.firestore,
    'productos'
  ) as CollectionReference<Product>;
  products = signal<Product[]>([]);
  allProducts = signal<Product[]>([]);
  randomProducts = signal<Product[]>([]);

  constructor(private http: HttpClient) {}

  async getProducts(
    type?: ProductType,
    pageSize: number = 40,
    lastDoc?: QueryDocumentSnapshot<Product>
  ) {
    let q: Query<Product, DocumentData> = this.productsCollection;
    if (type) {
      q = query(this.productsCollection, where('tipo', '==', type));
    }
    q = query(q, limit(pageSize));
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }
    const data = await getDocs(q);
    const products = [...data.docs.map((d) => ({ ...d.data(), id: d.id }))];
    this.products.set(products);
    this.allProducts.set(products);
    return {
      products,
      lastDoc: data.docs[data.docs.length - 1] as
        | QueryDocumentSnapshot<Product>
        | undefined,
    };
  }

  async getRandomProducts(random: number) {
    const all = this.allProducts();
    const randomProducts = this.getRandomItems(all, random);
    this.randomProducts.set(randomProducts);
  }

  private getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  async filterProducts(term?: string) {
    if (!term || term.trim() === '') {
      this.products.set(this.allProducts());
      return;
    }
    const filtered = this.allProducts().filter((product) =>
      product.nombre.toLowerCase().includes(term.trim().toLowerCase())
    );
    this.products.set(filtered);
  }

  async getProductById(id: string) {
    const docRef = doc(this.firestore, 'productos', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as Product;
      return {
        ...data,
        id: docSnap.id,
      } as Product;
    } else {
      console.warn(`Producto con ID ${id} no existe.`);
      return null;
    }
  }

  async getProductsByIds(cartItems: CartItem[]) {
    const products: Product[] = [];
    for (const item of cartItems) {
      const docSnap = await this.getProductById(item.id);
      if (docSnap) {
        products.push(docSnap);
      }
    }
    return products;
  }

  async addProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
    const prodRef = doc(this.productsCollection);
    const id = prodRef.id;
    await setDoc(prodRef, {
      ...product,
      id,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
  }

  async updateProduct(
    id: string,
    product: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>
  ) {
    const prodRef = doc(this.productsCollection, id);
    await setDoc(
      prodRef,
      {
        ...product,
        updated_at: serverTimestamp(),
      },
      { merge: true }
    );
  }

  async loadSeed() {
    const prodRef = collection(this.firestore, 'productos');
    this.http.get<Product[]>('data/products.json').subscribe(async (res) => {
      for (const product of res) {
        await setDoc(doc(prodRef), {
          nombre: product.nombre,
          portada: product.portada,
          miniatura: product.miniatura,
          marca: product.marca,
          descripcion: product.descripcion,
          modelo: product.modelo,
          precio: product.precio,
          galeria: product.galeria,
          tipo: product.tipo,
          stock: product.stock,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
        });
      }
    });
  }
}
