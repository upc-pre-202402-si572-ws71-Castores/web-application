import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const clientGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = localStorage.getItem('userRole');

  if (role === 'ROLE_CLIENT') {
    return true; // Permite acceso si el rol es cliente
  } else {
    router.navigate(['/app/carrier']); // Redirige al transportista si el rol no coincide
    return false;
  }
};