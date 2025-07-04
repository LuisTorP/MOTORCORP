import { Component, inject, Input } from '@angular/core';
import { CartDetail } from '../../interfaces/cart.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'cart-product',
  imports: [],
  templateUrl: './cart-product.html',
  styleUrl: './cart-product.scss',
})
export class CartProduct {
  private cartService = inject(CartService);

  @Input() product!: CartDetail;

  deleteItem(id: string) {
    this.cartService.removeProduct(id);
  }

  changeQuantity(id: string, newQuantity: number, stock: number) {
    this.cartService.updateQuantity(id, newQuantity, stock);
  }

  onQuantityTyping(event: Event, stock: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Si el usuario borra y deja vacío, forzamos a 1 inmediatamente
    if (value === '') {
      input.value = '1';
      return;
    }

    const parsed = Number.parseInt(value, 10);

    // Si mete letras o NaN
    if (isNaN(parsed) || parsed < 1) {
      input.value = '1';
    } else if (parsed > stock) {
      input.value = stock.toString();
    }
  }

  onQuantityInput(productId: string, event: Event, stock: number): void {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value;

    // Evitamos valores vacíos, negativos o fuera de rango
    let finalValue = Number.parseInt(rawValue, 10);

    if (rawValue === '') {
      finalValue = 1;
    } else if (isNaN(finalValue) || finalValue < 1) {
      finalValue = 1;
    } else if (finalValue > stock) {
      finalValue = stock;
    }

    // Actualizar visualmente el input (para que si puso algo fuera de rango se corrija al momento)
    input.value = finalValue.toString();

    // Actualizar el cart
    this.cartService.updateQuantity(productId, finalValue, stock);
  }
}
