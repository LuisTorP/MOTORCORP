import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserRole } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private firestore = inject(Firestore);
  private http = inject(HttpClient);

  userCollection = collection(
    this.firestore,
    'usuarios'
  ) as CollectionReference<User>;

  constructor() {
    // this.loadSeed();
  }

  async getUser(email: string, password: string, role?: UserRole) {
    const filters = [
      where('email', '==', email),
      where('password', '==', password),
      where('estado', '==', 'activo'),
    ];
    if (role !== undefined) {
      filters.push(where('rol', '==', role));
    }

    const q = query(this.userCollection, ...filters);

    const data = await getDocs(q);
    if (data.empty) {
      console.warn('No se encontró el usuario');
      return null;
    }
    const user = data.docs[0];
    const { password: _, ...userWithoutPassword } = user.data();
    return {
      ...userWithoutPassword,
      id: user.id,
    };
  }

  async registerUser(userFormData: Partial<User>) {
    const q = query(
      this.userCollection,
      where('email', '==', userFormData.email)
    );
    const result = await getDocs(q);
    if (!result.empty) {
      throw new Error('El correo electrónico ya está registrado');
    }
    const userRef = collection(this.firestore, 'usuarios');
    const newUserDoc = await addDoc(userRef, {
      ...userFormData,
      estado: 'activo',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
    return await getDoc(newUserDoc);
  }

  async loadSeed() {
    const userRef = collection(this.firestore, 'usuarios');
    this.http.get<User[]>('data/users.json').subscribe(async res => {
      for (const user of res) {
        const userDocRef = doc(userRef);
        await setDoc(userDocRef, {
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          password: user.password,
          telefono: user.telefono,
          rol: user.rol,
          estado: user.estado,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
        });
        if (user.direcciones && user.direcciones.length > 0) {
          const direccionesRef = collection(userDocRef, 'direcciones');
          for (const direccion of user.direcciones) {
            await addDoc(direccionesRef, {
              ...direccion,
              created_at: serverTimestamp(),
              updated_at: serverTimestamp(),
            });
          }
        }
      }
    });
  }
}
