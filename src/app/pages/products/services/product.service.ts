import { inject, Injectable, signal } from '@angular/core';
import {
  getDocs,
  collection,
  doc,
  getDoc,
  setDoc,
  CollectionReference,
  query,
  where,
  Query,
} from 'firebase/firestore';
import { Product } from '../intefaces/product.interface';
import { Firestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

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

  async getProducts() {
    const data = await getDocs(this.productsCollection);
    const products = [...data.docs.map((d) => ({ ...d.data(), id: d.id }))];
    this.products.set(products);
    this.allProducts.set(products);
  }

  async getRandomProducts(random: number) {
    const all = this.allProducts();
    const randomProducts = this.getRandomItems(all, random);
    this.randomProducts.set(randomProducts);
  }

  private getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    console.log(shuffled);
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
        });
      }
    });
  }
}
