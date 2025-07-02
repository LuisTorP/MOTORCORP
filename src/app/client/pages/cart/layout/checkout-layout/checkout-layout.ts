import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { APP_ROUTES } from '../../../../../routes.constant';
import { PaymentIcon } from '../../../../../shared/components/icons/payment-icon/payment-icon';
import { ConfirmationIcon } from '../../../../../shared/components/icons/confirmation-icon/confirmation-icon';
import { NgComponentOutlet } from '@angular/common';
import { TruckIcon } from '../../../../../shared/components/icons/shipping-icon/truck-icon';

@Component({
  selector: 'checkout-layout',
  imports: [RouterModule, NgComponentOutlet],
  templateUrl: './checkout-layout.html',
  styleUrl: './checkout-layout.scss',
})
export class CheckoutLayout {
  private router = inject(Router);

  routes = APP_ROUTES;
  steps = [
    {
      label: 'Envío',
      path: this.routes.client.cart.checkout.shipping,
      icon: TruckIcon,
    },
    {
      label: 'Pago',
      path: this.routes.client.cart.checkout.payment,
      icon: PaymentIcon,
    },
    {
      label: 'Confirmación',
      path: this.routes.client.cart.checkout.confirmation,
      icon: ConfirmationIcon,
    },
  ];

  currentStepIndex = computed(() => {
    const url = this.router.url;
    return this.steps.findIndex((step) => url.startsWith(step.path));
  });

  isStepActive(index: number): boolean {
    return index <= this.currentStepIndex();
  }
}
