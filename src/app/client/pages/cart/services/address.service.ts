import { inject, Injectable, signal } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { MailingAddress } from '../interfaces/shipping.interface';

@Injectable({ providedIn: 'root' })
export class AddressService {
  private firestore = inject(Firestore);
  addresses = signal<MailingAddress[]>([]);

  async getUserAddresses(userId: string) {
    const direccionesRef = collection(
      this.firestore,
      `usuarios/${userId}/direcciones`
    ) as CollectionReference<MailingAddress>;
    const direccionesSnap = await getDocs(direccionesRef);
    const addresses = direccionesSnap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));
    this.addresses.set(addresses);
    return addresses;
  }

  async registerUserAddress(
    userId: string,
    addressData: Partial<MailingAddress>
  ) {
    const direccionesRef = collection(
      this.firestore,
      `usuarios/${userId}/direcciones`
    );

    const newDocRef = await addDoc(direccionesRef, {
      ...addressData,
      estado: 'activo',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });

    // Agregas la nueva dirección al signal, con id temporal
    this.addresses.update(addresses => [
      ...addresses,
      {
        ...addressData,
        id: newDocRef.id,
      } as MailingAddress,
    ]);
  }

  async updateUserAddress(
    userId: string,
    addressId: string,
    addressData: Partial<MailingAddress>
  ) {
    const direccionRef = doc(
      this.firestore,
      `usuarios/${userId}/direcciones/${addressId}`
    );

    await updateDoc(direccionRef, {
      ...addressData,
      updated_at: serverTimestamp(),
    });
    this.addresses.update(addresses =>
      addresses.map(addr =>
        addr.id === addressId
          ? ({
              ...addr,
              ...addressData,
              updated_at: serverTimestamp(),
            } as MailingAddress)
          : addr
      )
    );
  }
}
