import { Product } from '../../products/interfaces/product.interface';
export interface CartItem {
  id: string;
  quantity: number;
}

export interface CartProduct extends Product {
  quantity: number;
}
