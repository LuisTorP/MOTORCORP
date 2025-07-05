import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'product-image',
  imports: [],
  templateUrl: './product-image.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductImage),
      multi: true,
    },
  ],
  styleUrl: './product-image.scss',
})
export class ProductImage implements ControlValueAccessor {
  title = input<string>('')
  value: string | null = null;
  fileName = '';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: string | null) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }

  writeValue(value: string | null): void {
    this.value = value;
  }
  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
