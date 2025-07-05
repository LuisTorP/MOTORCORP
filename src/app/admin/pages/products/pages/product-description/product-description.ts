import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../../../client/pages/products/services/product.service';
import { ActivatedRoute } from '@angular/router';
import {
  Product,
  ProductType,
} from '../../../../../client/pages/products/interfaces/product.interface';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductImage } from './components/product-image/product-image';

@Component({
  selector: 'app-product-description',
  imports: [ReactiveFormsModule, ProductImage],
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
    type: new FormControl<ProductType | null>('moto', Validators.required),
    miniature: new FormControl<string | null>('', Validators.required),
    portrait: new FormControl<string | null>('', Validators.required),
    galery: new FormArray<FormControl<string>>([]),
  });

  ngOnInit(): void {
    this.route.params.subscribe(({ productId }) => {
      this.getProduct(productId);
    });
  }

  getProduct(productId: string) {
    this.productService.getProductById(productId).then(res => {
      if (res) {
        this.product.set(res);

        const galeryArray = this.productForm.get('galery') as FormArray;
        galeryArray.clear();

        res.galeria.forEach((img: string) => {
          galeryArray.push(new FormControl(img));
        });

        this.productForm.reset({
          name: res.nombre,
          marc: res.marca,
          description: res.descripcion,
          model: res.modelo,
          price: res.precio,
          stock: res.stock,
          type: res.tipo,
          miniature: res.miniatura,
          portrait: res.portada,
          galery: res.galeria,
        });
      }
    });
  }

  get galeryControls(): FormControl<string>[] {
    return (this.productForm.get('galery') as FormArray<FormControl<string>>)
      .controls;
  }

  addGalleryImage() {
    const galeryArray = this.productForm.get('galery') as FormArray<
      FormControl<string | null>
    >;
    galeryArray.push(new FormControl(''));
  }

  removeGalleryImage(index: number) {
    const galeryArray = this.productForm.get('galery') as FormArray<
      FormControl<string>
    >;
    galeryArray.removeAt(index);
  }

  onSubmit() {
    if (!this.productForm.valid || !this.product()) return;

    const updatedProduct = {
      nombre: this.productForm.value.name!,
      marca: this.productForm.value.marc!,
      descripcion: this.productForm.value.description!,
      modelo: this.productForm.value.model!,
      precio: this.productForm.value.price!,
      stock: this.productForm.value.stock!,
      tipo: this.productForm.value.type!,
      portada: this.productForm.value.portrait!,
      miniatura: this.productForm.value.miniature!,
      galeria: this.productForm.value.galery!,
    };

    this.productService
      .updateProduct(this.product()!.id!, updatedProduct)
      .then(() => {
        alert('Producto actualizado correctamente.');
      })
      .catch(err => {
        console.error('Error al actualizar producto', err);
        alert('Error al actualizar el producto.');
      });
  }
}
