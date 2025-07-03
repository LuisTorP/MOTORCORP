import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { LocationService } from '../../../../../shared/services/location.service';
import { Location } from '../../../../../shared/interfaces/location.interface';
import { PinIcon } from '../../../../../shared/components/icons/pin-icon/pin-icon';
import { CloseIcon } from '../../../../../shared/components/icons/close-icon/close-icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MailingAddress } from '../../interfaces/shipping.interface';
import { AddressService } from '../../services/address.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'new-address-form',
  imports: [PinIcon, CloseIcon, ReactiveFormsModule],
  templateUrl: './new-address-form.html',
  styleUrl: './new-address-form.scss',
})
export class NewAddressForm implements OnInit {
  @Input() addressToEdit?: MailingAddress;
  @Output() closeForm = new EventEmitter();

  private locationService = inject(LocationService);
  private fb = inject(FormBuilder);
  private addressService = inject(AddressService);
  private authService = inject(AuthService);

  user = this.authService.user;
  departments = this.locationService.departments;
  provinces: Partial<Location>[] = [];
  districts: Partial<Location>[] = [];
  addressForm = this.fb.group({
    state: ['', Validators.required],
    province: [{ value: '', disabled: true }, Validators.required],
    district: [{ value: '', disabled: true }, Validators.required],
    address: ['', Validators.required],
    reference: [''],
    label: ['', Validators.required],
  });

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    if (this.addressToEdit) {
      this.onDepartmentChange(this.addressToEdit.departamento);
      this.onProvinceChange(this.addressToEdit.provincia);
      this.addressForm.setValue({
        address: this.addressToEdit.direccion,
        state: this.addressToEdit.departamento,
        district: this.addressToEdit.distrito,
        label: this.addressToEdit.titulo,
        province: this.addressToEdit.provincia,
        reference: this.addressToEdit.referencia || '',
      });
    }
  }

  emitCloseForm() {
    this.closeForm.emit();
  }

  onDepartmentChange(value: string) {
    this.provinces = this.locationService.getProvinces(value);
    this.addressForm.get('province')?.enable();
    this.addressForm.get('province')?.reset('');
    this.addressForm.get('district')?.disable();
    this.addressForm.get('district')?.reset('');
    this.districts = [];
  }

  onProvinceChange(value: string) {
    this.districts = this.locationService.getDistricts(value);
    this.addressForm.get('district')?.enable();
    this.addressForm.get('district')?.reset('');
  }

  async sendForm() {
    const userData = this.user();
    if (!userData) return;
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }
    const { address, district, label, province, reference, state } =
      this.addressForm.value;
    await this.addressService.registerUserAddress(userData.id, {
      direccion: address!,
      distrito: district!,
      titulo: label!,
      referencia: reference!,
      provincia: province!,
      departamento: state!,
    });
    this.emitCloseForm();
  }
}
