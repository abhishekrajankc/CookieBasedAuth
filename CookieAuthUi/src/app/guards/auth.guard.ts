import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthStateService } from '../services/auth-state.service';

export const authGuard: CanActivateFn = () => {
  const authState = inject(AuthStateService);
  const router = inject(Router);

  return authState.isAuthenticated().pipe(
    map((isAuthenticated) => isAuthenticated || router.createUrlTree(['/sign-in']))
  );
};
