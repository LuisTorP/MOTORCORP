import { Component, inject, Input } from '@angular/core';
import { CartDetail } from '../../interfaces/cart.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'confirmation-card',
  imports: [],
  templateUrl: './confirmation-card.html',
  styleUrl: './confirmation-card.scss',
})
export class ConfirmationCard {
  private cartService = inject(CartService);

  @Input() product!: CartDetail;
}
