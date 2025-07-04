import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../../../client/pages/products/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../../client/pages/products/interfaces/product.interface';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-product-description',
  imports: [ReactiveFormsModule],
  templateUrl: './product-description.html',
  styleUrl: './product-description.scss',
})
export class ProductDescription implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  product = signal<Product | null>(null);

  public productForm = new FormGroup({
    name: new FormControl<string | null>('', Validators.required),
    description: new FormControl<string | null>('', Validators.required),
    marc: new FormControl<string | null>('', Validators.required),
    model: new FormControl<string | null>('', Validators.required),
    price: new FormControl<number | null>(0, Validators.required),
    stock: new FormControl<number | null>(0, Validators.required),
    type: new FormControl<string | null>('', Validators.required),
  });

  ngOnInit(): void {
    this.route.params.subscribe(({ productId }) => {
      this.getProduct(productId);
    });
  }

  getProduct(productId: string) {
    this.productService.getProductById(productId).then((res) => {
      if (res) {
        this.product.set(res);
        this.productForm.reset({
          name: res.nombre,
          marc: res.marca,
          description: res.descripcion,
          model: res.modelo,
          price: res.precio,
          stock: res.stock,
          type: res.tipo,
        });
      }
    });
  }
}
