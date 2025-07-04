import { Timestamp } from 'firebase/firestore';
export interface ShippingMethod {
  id: string;
  label: string;
  note: string;
  price: number;
}

export interface MailingAddress {
  id: string;
  titulo: string;
  departamento: string; // Departamento
  provincia: string; // Provincia
  distrito: string; // Distrito
  direccion: string; // Dirección
  referencia?: string; // Referencia (opcional)
  created_at: Timestamp;
  updated_at: Timestamp;
  estado: 'activo' | 'inactivo';
}

export interface PaymentMethod {
  cardNumber: string;
  owner: string;
  expiration: string;
  safeCode: string;
}
