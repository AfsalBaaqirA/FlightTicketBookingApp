import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin');
  const authService = inject(AuthService);

  if (token !== null || isAdmin === 'true') {
    if (authService.validate()){
      return true;
    }
    return router.parseUrl('/login');
  }
  return router.parseUrl('/login');
};
