export interface Product {
  nombre: string;
  portada: string;
  miniatura: string;
  marca: string;
  descripcion: string;
  modelo: string;
  precio: number;
  galeria: string[];
  tipo: Tipo;
  id: string;
}

export enum Tipo {
  Moto = 'moto',
}
