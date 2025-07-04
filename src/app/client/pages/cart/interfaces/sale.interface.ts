import { Timestamp } from 'firebase/firestore/lite';
import { CartDetail } from './cart.interface';
import {
  ShippingMethod,
  MailingAddress,
  PaymentMethod,
} from './shipping.interface';

export interface Sale {
  userId: string;
  productos: CartDetail[];
  total: number;
  metodoEnvio: ShippingMethod;
  direccion?: MailingAddress;
  metodoPago: PaymentMethod;
  estado: 'pendiente' | 'pagado' | 'cancelado';
  created_at: Timestamp;
}
