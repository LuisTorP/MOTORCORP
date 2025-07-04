import { inject, Injectable, signal } from '@angular/core';
import { StorageService } from '../../../../shared/services/storage.service';
import {
  MailingAddress,
  PaymentMethod,
  ShippingMethod,
} from '../interfaces/shipping.interface';

@Injectable({ providedIn: 'root' })
export class ShippingService {
  shippingMethods: ShippingMethod[] = [
    {
      id: 'pickup',
      label: 'Recojo en tienda',
      note: 'Disponible hoy',
      price: 0,
    },
    {
      id: 'standard',
      label: 'Envío estándar',
      note: '3-5 días hábiles',
      price: 15,
    },
    {
      id: 'express',
      label: 'Envío express',
      note: '1-2 días hábiles',
      price: 25,
    },
  ];

  private storageService = inject(StorageService);
  private keyShippingMethod = 'shippingMethod';
  private keyShippingAddress = 'shippingAddress';
  private keyPaymentMethod = 'paymentMethod';

  shippingMethod = signal<ShippingMethod | null>(this.loadShippingMethod());
  shippingAddress = signal<MailingAddress | null>(this.loadShippingAddress());
  paymentMethod = signal<PaymentMethod | null>(this.loadPaymentMethod());

  private loadShippingMethod(): ShippingMethod | null {
    return this.storageService.getItem<ShippingMethod>(this.keyShippingMethod);
  }

  private loadShippingAddress() {
    return this.storageService.getItem<MailingAddress>(this.keyShippingAddress);
  }

  private loadPaymentMethod() {
    return this.storageService.getItem<PaymentMethod>(this.keyPaymentMethod);
  }

  selectShippingMethod(method: ShippingMethod): void {
    if (this.shippingMethods.some(m => m === method)) {
      this.shippingMethod.set(method);
      this.storageService.setItem(this.keyShippingMethod, method);
      if (method.price === 0) this.clearShippingAddress();
    }
  }

  clearShippingMethod(): void {
    this.shippingMethod.set(null);
    this.storageService.removeItem(this.keyShippingMethod);
  }

  selectShippingAddress(address: MailingAddress | null) {
    this.shippingAddress.set(address);
    this.storageService.setItem(this.keyShippingAddress, address);
  }

  clearShippingAddress() {
    this.shippingAddress.set(null);
    this.storageService.removeItem(this.keyShippingAddress);
  }

  selectPaymentMethod(paymentMethod: PaymentMethod | null) {
    this.paymentMethod.set(paymentMethod);
    this.storageService.setItem(this.keyPaymentMethod, paymentMethod);
  }

  clearPaymentMethod() {
    this.paymentMethod.set(null);
    this.storageService.removeItem(this.keyPaymentMethod);
  }
}
