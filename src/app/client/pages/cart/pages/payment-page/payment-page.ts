import { Component } from '@angular/core';
import { PaymentMethod } from '../../components/payment-method/payment-method';

@Component({
  selector: 'payment-page',
  imports: [PaymentMethod],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.scss',
})
export class PaymentPage {}
