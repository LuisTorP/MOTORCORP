import { inject, Injectable, signal } from '@angular/core';
import { StorageService } from '../../../shared/services/storage.service';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageService = inject(StorageService);
  private key = 'user';

  user = signal<User | null>(this.storageService.getItem(this.key, true));

  login(user: User): void {
    this.storageService.setItem(this.key, user, true);
    this.user.set(user);
  }

  logout(): void {
    this.storageService.removeItem(this.key, true);
    this.user.set(null);
  }
}
