import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token'); // Verifica si hay un token en el almacenamiento local

  if (token) {
    return true; // Permite el acceso si el token existe
  } else {
    router.navigate(['/auth/sign-in']); // Redirige al inicio de sesión si no hay token
    return false;
  }
};