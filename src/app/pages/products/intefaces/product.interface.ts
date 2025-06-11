export interface Product {
  nombre: string;
  portada: string;
  miniatura: string;
  marca: string;
  descripcion: string;
  modelo: string;
  precio: number;
  galeria: string[];
  tipo: ProductType;
  id: string;
}

export type ProductType = 'moto' | 'accesorio' | 'repuesto';
