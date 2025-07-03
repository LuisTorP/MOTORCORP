import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PlatformService {
  private platformId = inject(PLATFORM_ID);

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  isServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  scrollTop(smooth: boolean) {
    if (this.isBrowser())
      window.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'instant',
      });
  }
}
