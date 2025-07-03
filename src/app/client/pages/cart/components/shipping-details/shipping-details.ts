import { Component, inject } from '@angular/core';
import { TruckIcon } from '../../../../../shared/components/icons/shipping-icon/truck-icon';
import { UserIcon } from '../../../../../shared/components/icons/user-icon/user-icon';
import { ShippingMethodSelector } from '../shipping-method-selector/shipping-method-selector';
import { ShippingAddressSelector } from '../shipping-address-selector/shipping-address-selector';
import { RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../../../../routes.constant';
import { ShippingService } from '../../services/shipping.service';

@Component({
  selector: 'shipping-details',
  imports: [
    TruckIcon,
    UserIcon,
    ShippingMethodSelector,
    ShippingAddressSelector,
    RouterLink,
  ],
  templateUrl: './shipping-details.html',
  styleUrl: './shipping-details.scss',
})
export class ShippingDetails {
  private shippingService = inject(ShippingService);
  shippingMethod = this.shippingService.shippingMethod;

  routes = APP_ROUTES;
}
