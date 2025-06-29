import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from '../../../../../routes.constant';

@Component({
  selector: 'card-product',
  imports: [RouterModule],
  templateUrl: './card-product.html',
  styleUrl: './card-product.scss',
})
export class CardProduct {
  @Input() product!: Product;
  routes = APP_ROUTES;
}
