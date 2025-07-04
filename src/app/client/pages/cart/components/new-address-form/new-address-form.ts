import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { LocationService } from '../../../../../shared/services/location.service';
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
export class NewAddressForm implements OnInit, OnDestroy {
  @Input() addressToEdit?: MailingAddress;
  @Output() closeForm = new EventEmitter();

  private locationService = inject(LocationService);
  private fb = inject(FormBuilder);
  private addressService = inject(AddressService);
  private authService = inject(AuthService);

  user = this.authService.user;

  departments = this.locationService.departments;
  provinces = this.locationService.provinces;
  districts = this.locationService.districts;

  addressForm = this.fb.group({
    state: ['', Validators.required],
    province: [{ value: '', disabled: true }, Validators.required],
    // province: ['', Validators.required],
    district: [{ value: '', disabled: true }, Validators.required],
    // district: ['', Validators.required],
    address: ['', Validators.required],
    reference: [''],
    label: ['', Validators.required],
  });

  ngOnInit(): void {
    this.setForm();
  }

  ngOnDestroy(): void {
    this.locationService.selectDepartment(null);
    this.locationService.selectProvince(null);
  }

  setForm() {
    const address = this.addressToEdit;
    if (address) {
      this.selectDepartment(address.departamento);
      this.selectProvince(address.provincia);
      this.addressForm.get('province')?.enable();
      this.addressForm.get('district')?.enable();
      this.addressForm.setValue({
        address: address.direccion,
        state: address.departamento,
        district: address.distrito,
        label: address.titulo,
        province: address.provincia,
        reference: address.referencia || '',
      });
    }
  }

  emitCloseForm() {
    this.closeForm.emit();
  }

  selectDepartment(department: string | null) {
    this.locationService.selectDepartment(department);
  }

  selectProvince(department: string | null) {
    this.locationService.selectProvince(department);
  }

  onDepartmentChange(value: string) {
    this.selectDepartment(value);
    this.addressForm.get('province')?.enable();
    this.addressForm.get('province')?.reset('');
    this.addressForm.get('district')?.disable();
    this.addressForm.get('district')?.reset('');
  }

  onProvinceChange(value: string) {
    this.selectProvince(value);
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
    const addressData: Partial<MailingAddress> = {
      direccion: address!,
      distrito: district!,
      titulo: label!,
      referencia: reference!,
      provincia: province!,
      departamento: state!,
    };
    const addressToEdit = this.addressToEdit;
    if (addressToEdit) {
      await this.addressService.updateUserAddress(
        userData.id,
        addressToEdit.id,
        addressData
      );
    } else {
      await this.addressService.registerUserAddress(userData.id, addressData);
    }
    this.emitCloseForm();
  }
}
