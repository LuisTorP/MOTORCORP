import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from '../../../../shared/services/storage.service';
import { CartDetail, CartItem } from '../interfaces/cart.interface';
import { Product } from '../../products/interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class CartService {
  private storageService = inject(StorageService);
  private key = 'cart';
  products = signal<CartItem[]>(this.loadCart());
  cartDetails = signal<CartDetail[]>([]);
  totalItems = computed(() => {
    return this.cartDetails().reduce((sum, item) => sum + item.quantity, 0);
  });
  totalPrice = computed(() => {
    return this.cartDetails().reduce(
      (sum, item) => sum + item.precio * item.quantity,
      0
    );
  });

  loadCart() {
    return this.storageService.getItem<CartItem[]>(this.key) || [];
  }

  private saveCart(): void {
    this.storageService.setItem(this.key, this.products());
  }

  clearCart() {
    this.storageService.removeItem(this.key);
    this.cartDetails.set([]);
  }

  addProduct(product: Product): void {
    if (product.stock === 0) return;
    const currentCart = this.products();
    const existing = currentCart.find(p => p.id === product.id);
    if (existing && existing?.quantity < product.stock) {
      existing.quantity += 1;
    } else if (!existing) {
      this.products.set([...currentCart, { id: product.id, quantity: 1 }]);
    }
    this.refreshCartDetails();
    this.saveCart();
  }

  removeProduct(productId: string): void {
    const updatedCart = this.products().filter(p => p.id !== productId);
    this.products.set(updatedCart);
    this.refreshCartDetails();
    this.saveCart();
  }

  updateQuantity(productId: string, newQuantity: number, stock: number) {
    const validQuantity = Math.max(1, Math.min(newQuantity, stock));
    const updatedCart = this.products().map(item => {
      if (item.id === productId) {
        return { ...item, quantity: validQuantity };
      }
      return item;
    });
    this.products.set(updatedCart);
    this.refreshCartDetails();
    this.saveCart();
  }

  refreshCartDetails() {
    const cartItems = this.products();
    const cartDetails = this.cartDetails();

    const merged: CartDetail[] = cartDetails.flatMap(detail => {
      const exist = cartItems.find(item => item.id === detail.id);
      return exist ? [{ ...detail, quantity: exist.quantity }] : [];
    });
    this.cartDetails.set(merged);
  }
}
