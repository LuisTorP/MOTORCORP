import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { CartDetail, CartItem } from '../interfaces/cart.interface';
import {
  MailingAddress,
  PaymentMethod,
  ShippingMethod,
} from '../interfaces/shipping.interface';
import { ProductService } from '../../products/services/product.service';
import { Sale } from '../interfaces/sale.interface';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private firestore = inject(Firestore);
  private productService = inject(ProductService);

  private saleCollection = collection(this.firestore, 'ventas');

  async registerSale(
    userId: string,
    cartItems: CartItem[],
    shippingMethod: ShippingMethod,
    paymentMethod: PaymentMethod,
    shippingAddress: MailingAddress | null
  ) {
    const cartDetails: CartDetail[] = await this.getProducts(cartItems);
    const totalItems = cartDetails.reduce(
      (sum, item) => sum + item.precio * item.quantity,
      0
    );
    const total = totalItems + shippingMethod.price;
    const newSale: Sale = {
      userId,
      productos: cartDetails,
      created_at: serverTimestamp() as Timestamp,
      metodoEnvio: { ...shippingMethod },
      estado: 'pagado',
      metodoPago: { ...paymentMethod },
      total,
      ...(shippingAddress && { direccion: { ...shippingAddress } }),
    };
    const sale = await addDoc(this.saleCollection, newSale);
    await this.updateStockAfterSale(cartDetails);
    return sale;
  }

  private async getProducts(cartItems: CartItem[]) {
    const products = await this.productService.getProductsByIds(cartItems);
    const merged: CartDetail[] = products
      .map(product => {
        const item = cartItems.find(i => i.id === product.id);
        if (!item) return null;
        return {
          ...product,
          quantity: item.quantity,
        };
      })
      .filter((item): item is CartDetail => item !== null);
    return merged;
  }

  private async updateStockAfterSale(cartDetails: CartDetail[]) {
    for (const item of cartDetails) {
      const newStock = item.stock - item.quantity;
      if (newStock < 0) {
        throw new Error(
          `El producto "${item.nombre}" no tiene suficiente stock.`
        );
      }
      await this.productService.updateProduct(item.id, { stock: newStock });
    }
  }
}
