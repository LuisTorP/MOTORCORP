import { Component } from '@angular/core';
import { TruckIcon } from '../../../../../shared/components/icons/shipping-icon/truck-icon';
import { UserIcon } from '../../../../../shared/components/icons/user-icon/user-icon';
import { ShippingMethodSelector } from '../shipping-method-selector/shipping-method-selector';
import { ShippingAddressSelector } from '../shipping-address-selector/shipping-address-selector';

@Component({
  selector: 'shipping-details',
  imports: [
    TruckIcon,
    UserIcon,
    ShippingMethodSelector,
    ShippingAddressSelector,
  ],
  templateUrl: './shipping-details.html',
  styleUrl: './shipping-details.scss',
})
export class ShippingDetails {}
