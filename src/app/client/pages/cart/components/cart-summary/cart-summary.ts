import { Component, computed, Input, signal } from '@angular/core';
import { CartDetail } from '../../interfaces/cart.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cart-summary',
  imports: [CommonModule],
  templateUrl: './cart-summary.html',
  styleUrl: './cart-summary.scss',
})
export class CartSummary {
  private _details = signal<CartDetail[]>([]);

  @Input()
  set details(value: CartDetail[]) {
    this._details.set(value);
  }

  totalItems = computed(() => {
    return this._details().reduce((sum, item) => sum + item.quantity, 0);
  });

  totalPrice = computed(() => {
    return this._details().reduce(
      (sum, item) => sum + item.precio * item.quantity,
      0
    );
  });
}
