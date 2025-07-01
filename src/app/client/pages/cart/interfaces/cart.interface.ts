import { Product } from '../../products/interfaces/product.interface';
export interface CartItem {
  id: string;
  quantity: number;
}

export interface CartDetail extends Product {
  quantity: number;
}
