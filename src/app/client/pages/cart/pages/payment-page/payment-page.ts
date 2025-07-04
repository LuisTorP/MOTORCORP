import { Component } from '@angular/core';
import { PaymentDetails } from '../../components/payment-details/payment-details';
import { PaymentGuarantees } from '../../components/payment-guarantees/payment-guarantees';
import { PaymentBenefits } from '../../components/payment-benefits/payment-benefits';
import { PaymentMethod } from '../../components/payment-method/payment-method';

@Component({
  selector: 'payment-page',
  imports: [PaymentDetails, PaymentGuarantees, PaymentBenefits, PaymentMethod],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.scss',
})
export class PaymentPage {}
