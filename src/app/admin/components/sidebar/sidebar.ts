import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_ROUTES } from '../../../routes.constant';
import { AuthService } from '../../../client/pages/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  routes = APP_ROUTES;

  private authService = inject(AuthService);
  user = this.authService.user;

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
