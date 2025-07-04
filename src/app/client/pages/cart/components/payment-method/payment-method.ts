import { Component, inject, OnInit } from '@angular/core';
import { CreditCardIcon } from '../../../../../shared/components/icons/credit-card-icon/credit-card-icon';
import { Router, RouterLink } from '@angular/router';
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
export class PaymentMethod implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private shippingService = inject(ShippingService);
  private router = inject(Router);
  paymentMethodSignal = this.shippingService.paymentMethod;
  routes = APP_ROUTES;
  paymentForm = this.fb.group({
    cardNumber: ['', Validators.required],
    owner: ['', Validators.required],
    expiration: ['', Validators.required],
    safeCode: ['', Validators.required],
  });

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    const paymentMethodData = this.paymentMethodSignal();
    if (!paymentMethodData) return;
    this.paymentForm.reset(paymentMethodData);
  }

  sendPayment() {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }
    const values = this.paymentForm.value as PM;
    this.shippingService.selectPaymentMethod(values);
    this.router.navigate([this.routes.client.cart.checkout.confirmation]);
  }
}
