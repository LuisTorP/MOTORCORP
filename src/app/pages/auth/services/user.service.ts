import {
  collection,
  CollectionReference,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { inject, Injectable } from '@angular/core';
import { User, UserRole } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private firestore = inject(Firestore);
  private http = inject(HttpClient);

  userCollection = collection(
    this.firestore,
    'usuarios'
  ) as CollectionReference<User>;

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
    await setDoc(doc(userRef), {
      ...userFormData,
      estado: 'activo',
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
  }

  async loadSeed() {
    const userRef = collection(this.firestore, 'usuarios');
    this.http.get<User[]>('data/users.json').subscribe(async (res) => {
      for (const user of res) {
        await setDoc(doc(userRef), {
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          password: user.password,
          telefono: user.telefono,
          direccion: user.direccion,
          rol: user.rol,
          estado: user.estado,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
        });
      }
    });
  }
}
