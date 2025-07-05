import { Component, inject, output } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Product,
  ProductType,
} from '../../../../../../../client/pages/products/interfaces/product.interface';
import { ProductService } from '../../../../../../../client/pages/products/services/product.service';

@Component({
  selector: 'product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  stateForm = output<boolean>();
  submitProduct = output<Omit<Product, 'id' | 'created_at' | 'updated_at'>>();

  public productService = inject(ProductService);

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

  addProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const value = this.productForm.value;
    const galery = (
      this.productForm.get('galery') as FormArray<FormControl<string>>
    ).controls.map(c => c.value);

    const product: Omit<Product, 'id' | 'created_at' | 'updated_at'> = {
      nombre: value.name!,
      descripcion: value.description!,
      marca: value.marc!,
      modelo: value.model!,
      precio: value.price!,
      stock: value.stock!,
      tipo: value.type!,
      miniatura: value.miniature!,
      portada: value.portrait!,
      galeria: galery,
    };

    this.productService.addProduct(product).then(() => {
      alert('Producto añadido con éxito');
      this.submitProduct.emit(product);
      this.productForm.reset();
      this.stateForm.emit(false);
    });
  }
}
