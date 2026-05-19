import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token-service';
import { MainLayout } from './../../layout/main-layout/main-layout';

export const authGuard: CanActivateFn = (route, state) => {

  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.isValid()) {
    return true;
  }
  return router.createUrlTree(['/login'])

};
