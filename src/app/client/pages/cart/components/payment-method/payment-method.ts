import { Component, inject } from '@angular/core';
import { CreditCardIcon } from '../../../../../shared/components/icons/credit-card-icon/credit-card-icon';
import { RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../../../../routes.constant';
import { ShieldIcon } from '../../../../../shared/components/icons/shield-icon/shield-icon';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ShippingService } from '../../services/shipping.service';
import { PaymentMethod as PM } from '../../interfaces/shipping.interface';
@Component({
  selector: 'payment-method',
  imports: [CreditCardIcon, RouterLink, ShieldIcon, ReactiveFormsModule],
  templateUrl: './payment-method.html',
  styleUrl: './payment-method.scss',
})
export class PaymentMethod {
  private fb = inject(NonNullableFormBuilder);
  private shippingService = inject(ShippingService);
  routes = APP_ROUTES;
  paymentForm = this.fb.group({
    cardNumber: ['', Validators.required],
    owner: ['', Validators.required],
    expiration: ['', Validators.required],
    safeCode: ['', Validators.required],
  });

  sendPayment() {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }
    const values = this.paymentForm.value as PM;
    this.shippingService.selectPaymentMethod(values);
  }
}
