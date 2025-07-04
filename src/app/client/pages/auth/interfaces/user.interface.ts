import { Timestamp } from 'firebase/firestore';
import { MailingAddress } from '../../cart/interfaces/shipping.interface';

export type UserRole = 'admin' | 'comprador';
export type UserState = 'activo' | 'inactivo';

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono?: string;
  rol: UserRole;
  estado: 'activo' | 'inactivo';
  created_at: Timestamp;
  updated_at: Timestamp;
  direcciones: MailingAddress[];
}
