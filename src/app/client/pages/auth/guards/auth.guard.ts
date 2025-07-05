import { Router, type CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { APP_ROUTES } from '../../../../routes.constant';

const routes = APP_ROUTES;

export const isLoggedInGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const usuario = authService.user();
  if (!usuario) {
    router.navigate([routes.client.auth.login]);
    return false;
  }
  return true;
};

export const isNotLoggedInGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const usuario = authService.user();
  if (usuario) {
    router.navigate([routes.client.home.root]);
    return false;
  }
  return true;
};

export const isAdminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const usuario = authService.user();

  if (!usuario || usuario.rol !== 'admin') {
    router.navigate([routes.client.home.root]);
    return false;
  }

  return true;
};
