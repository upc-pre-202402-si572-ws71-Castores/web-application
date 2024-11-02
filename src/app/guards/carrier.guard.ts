import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const carrierGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = localStorage.getItem('userRole');

  if (role === 'ROLE_TRANSPORTER') {
    return true; // Permite acceso si el rol es transportista
  } else {
    router.navigate(['/app/client']); // Redirige al cliente si el rol no coincide
    return false;
  }
};