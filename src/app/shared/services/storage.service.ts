import { inject, Injectable } from '@angular/core';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private platformService = inject(PlatformService);

  setItem(key: string, value: any, useSession: boolean = false): void {
    if (this.platformService.isServer()) return;
    const data = JSON.stringify(value);
    if (useSession) {
      sessionStorage.setItem(key, data);
    } else {
      localStorage.setItem(key, data);
    }
  }

  getItem<T>(key: string, useSession: boolean = false): T | null {
    if (this.platformService.isServer()) return null;
    const storage = useSession ? sessionStorage : localStorage;
    const data = storage.getItem(key);
    if (data === null) return null;

    try {
      return JSON.parse(data) as T;
    } catch (e) {
      console.error('Error al parsear los datos del storage', e);
      return null;
    }
  }

  removeItem(key: string, useSession: boolean = false): void {
    if (this.platformService.isServer()) return;
    const storage = useSession ? sessionStorage : localStorage;
    storage.removeItem(key);
  }

  clear(useSession: boolean = false): void {
    if (this.platformService.isServer()) return;
    const storage = useSession ? sessionStorage : localStorage;
    storage.clear();
  }
}
