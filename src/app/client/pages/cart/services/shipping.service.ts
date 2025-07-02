import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from '../../../../shared/services/storage.service';
import { ShippingMethod } from '../interfaces/shipping.interface';

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
  private key = 'shipping';

  shippingMethod = signal<ShippingMethod>(this.loadShippingMethod());

  private loadShippingMethod(): ShippingMethod {
    const saved = this.storageService.getItem<ShippingMethod>(this.key);
    if (saved && this.shippingMethods.some((m) => m.id === saved.id)) {
      return saved;
    }
    const freeMethod = this.shippingMethods.find((m) => m.price === 0);
    return freeMethod ? freeMethod : this.shippingMethods[0];
  }

  selectShippingMethod(method: ShippingMethod): void {
    if (this.shippingMethods.some((m) => m === method)) {
      this.shippingMethod.set(method);
      this.storageService.setItem(this.key, method);
    }
  }

  clearShippingMethod(): void {
    const freeMethod = this.shippingMethods.find((m) => m.price === 0);
    this.shippingMethod.set(freeMethod ? freeMethod : this.shippingMethods[0]);
    localStorage.removeItem(this.key);
  }
}
