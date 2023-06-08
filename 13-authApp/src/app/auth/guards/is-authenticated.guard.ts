import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService ); //Injecto el service para obtener el authStatus.
  const router = inject( Router ); //Para poder aplicar la redirección.
  
  if( authService.authStatus() === AuthStatus.authenticated ){
    return true;
  }
  
  router.navigateByUrl('/auth/login')
  return false;
};
