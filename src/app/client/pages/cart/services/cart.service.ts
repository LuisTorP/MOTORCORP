import { inject, Injectable, signal } from '@angular/core';
import { StorageService } from '../../../../shared/services/storage.service';
import { CartItem } from '../interfaces/cart.interface';
import { Product } from '../../products/interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class CartService {
  private storageService = inject(StorageService);
  private key = 'cart';
  products = signal<CartItem[]>(this.loadCart());

  loadCart() {
    return this.storageService.getItem<CartItem[]>(this.key) || [];
  }

  private saveCart(): void {
    this.storageService.setItem(this.key, this.products());
  }

  addProduct(product: Product): void {
    const currentCart = this.products();
    const existing = currentCart.find((p) => p.id === product.id);
    if (existing && existing?.quantity < product.stock) {
      existing.quantity += 1;
    } else {
      this.products.set([...currentCart, { id: product.id, quantity: 1 }]);
    }
    this.saveCart();
  }

  removeProduct(productId: string): void {
    const updatedCart = this.products().filter((p) => p.id !== productId);
    this.products.set(updatedCart);
    this.saveCart();
  }

  updateQuantity(productId: string, newQuantity: number, stock: number) {
    const validQuantity = Math.max(1, Math.min(newQuantity, stock));
    const updatedCart = this.products().map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: validQuantity };
      }
      return item;
    });
    this.products.set(updatedCart);
    this.saveCart();
  }
}
