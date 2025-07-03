import { Component, effect, inject } from '@angular/core';
import { MailingAddress } from '../../interfaces/shipping.interface';
import { AddressService } from '../../services/address.service';
import { AuthService } from '../../../auth/services/auth.service';
import { TruckIcon } from '../../../../../shared/components/icons/shipping-icon/truck-icon';
import { CheckCircleIcon } from '../../../../../shared/components/icons/check-circle-icon/check-circle-icon';
import { UserAddIcon } from '../../../../../shared/components/icons/user-add-icon/user-add-icon';
import { NewAddressForm } from '../new-address-form/new-address-form';
import { EditIcon } from '../../../../../shared/components/icons/edit-icon/edit-icon';

@Component({
  selector: 'shipping-address-selector',
  imports: [TruckIcon, CheckCircleIcon, UserAddIcon, NewAddressForm, EditIcon],
  templateUrl: './shipping-address-selector.html',
  styleUrl: './shipping-address-selector.scss',
})
export class ShippingAddressSelector {
  private addressService = inject(AddressService);
  private authService = inject(AuthService);
  selectedAddress: MailingAddress | undefined = undefined;
  addresses = this.addressService.addresses;
  user = this.authService.user;
  isFormOpenned = false;

  constructor() {
    effect(() => {
      const dataUser = this.user();
      if (dataUser) {
        this.loadAddresses(dataUser.id);
      }
    });
  }

  async loadAddresses(userId: string) {
    await this.addressService.getUserAddresses(userId);
  }

  getFormattedLocation(address: MailingAddress): string {
    const { departamento, provincia, distrito } = address;
    if (departamento === provincia) {
      return `${distrito}, ${departamento}`;
    } else if (provincia === distrito) {
      return `${distrito}, ${departamento}`;
    }
    return `${distrito}, ${provincia}, ${departamento}`;
  }

  toggleForm(state: boolean, address: MailingAddress | undefined = undefined) {
    this.isFormOpenned = state;
    this.selectedAddress = address;
  }
}
