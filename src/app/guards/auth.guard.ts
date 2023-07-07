import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  if (state.url === '/login' || state.url === '/signup') {
    if (!authService.getLogInStatus())
      return true;
    return router.parseUrl('/search-flights');  
  }
  else if (state.url === "/search-flights" || state.url === "/view-ticket" || state.url === '/logout' || state.url === '/book-flight/:flightNumber') {
    if (authService.getLogInStatus())
      return true;
    return router.parseUrl('/login');
  }
  return true;
};
