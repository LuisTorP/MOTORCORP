import { Component, Input } from '@angular/core';

export interface Brand {
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'card-brand',
  imports: [],
  templateUrl: './card-brand.html',
  styleUrl: './card-brand.scss',
})
export class CardBrand {
  @Input() brand!: Brand;
}
