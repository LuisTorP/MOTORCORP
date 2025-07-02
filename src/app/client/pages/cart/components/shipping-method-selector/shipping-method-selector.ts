import { Component, inject } from '@angular/core';
import { ShippingMethod } from '../../interfaces/shipping.interface';
import { ShippingService } from '../../services/shipping.service';

@Component({
  selector: 'shipping-method-selector',
  imports: [],
  templateUrl: './shipping-method-selector.html',
  styleUrl: './shipping-method-selector.scss',
})
export class ShippingMethodSelector {
  private shippingService = inject(ShippingService);
  shippingMethods = this.shippingService.shippingMethods;
  shippingMethod = this.shippingService.shippingMethod;

  changeShippingMethod(method: ShippingMethod) {
    this.shippingService.selectShippingMethod(method);
  }
}
