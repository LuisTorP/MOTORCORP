import { Timestamp } from 'firebase/firestore';

export interface Product {
  id: string;
  nombre: string;
  portada: string;
  miniatura: string;
  marca: string;
  descripcion: string;
  modelo: string;
  precio: number;
  galeria: string[];
  tipo: ProductType;
  stock: number;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export type ProductType = 'moto' | 'accesorio' | 'repuesto';
