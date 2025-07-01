import { Component, Input } from '@angular/core';
import { Product } from '../../../products/interfaces/product.interface';

@Component({
  selector: 'cart-product',
  imports: [],
  templateUrl: './cart-product.html',
  styleUrl: './cart-product.scss',
})
export class CartProduct {
  // @Input() product!: Product;
  product: Partial<Product> = {
    nombre: 'Motocicleta Honda XR150L',
    portada:
      'https://tesis-files.s3.us-east-2.amazonaws.com/motorcorp/212_1.png',
    miniatura:
      'https://tesis-files.s3.us-east-2.amazonaws.com/motorcorp/212_1.png',
    marca: 'Honda',
    descripcion:
      'Motocicleta doble propósito, ideal para ciudad y caminos rurales.',
    modelo: 'XR150L',
    precio: 9500.0,
    galeria: [
      'https://example.com/img/honda-xr150l-1.jpg',
      'https://example.com/img/honda-xr150l-2.jpg',
    ],
    tipo: 'moto',
    stock: 9,
  };
}
