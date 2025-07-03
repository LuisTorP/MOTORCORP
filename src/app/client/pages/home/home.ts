import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../products/services/product.service';
import { CardProduct } from '../products/components/card-product/card-product';
import { Product } from '../products/interfaces/product.interface';
import { CardBrand, Brand } from './components/card-brand/card-brand';

@Component({
  selector: 'app-home',
  imports: [CardProduct, CardBrand],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private productService = inject(ProductService);

  randomProducts = signal<Product[]>([]);

  brands: Brand[] = [
    {
      id: 1,
      name: 'Honda',
      image: 'https://1000marcas.net/wp-content/uploads/2021/03/Honda-Logo.png',
    },
    {
      id: 2,
      name: 'KTM',
      image:
        'https://i.pinimg.com/564x/7e/71/30/7e7130b3f36ebe75872ebc872c536cc1.jpg',
    },
    {
      id: 3,
      name: 'Haojue',
      image:
        'https://images.seeklogo.com/logo-png/33/1/haojue-logo-png_seeklogo-333526.png',
    },
    {
      id: 4,
      name: 'Yamaha',
      image:
        'https://1000marcas.net/wp-content/uploads/2019/12/Yamaha-Log%D0%BE.jpg',
    },
    {
      id: 5,
      name: 'Suzuki',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Suzuki_logo_2025_%28vertical%29.svg/2560px-Suzuki_logo_2025_%28vertical%29.svg.png',
    },
    {
      id: 6,
      name: 'Bajaj',
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/019/766/250/small_2x/bajaj-logo-bajaj-icon-transparent-free-png.png',
    },
  ];

  async ngOnInit() {
    this.randomProducts = this.productService.randomProducts;
    await this.productService.getProducts();
    await this.productService.getRandomProducts(6);
  }
}
