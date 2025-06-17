import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_ROUTES } from '../../routes.constant';
import { AuthService } from '../../pages/auth/services/auth.service';
import { PlatformService } from '../../shared/services/platform.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private authService = inject(AuthService);
  private platformService = inject(PlatformService);
  routes = APP_ROUTES;
  user = this.authService.user;

  logout() {
    // if (this.platformService.isServer()) return;
    this.authService.logout();
    window.location.reload();
  }
}
