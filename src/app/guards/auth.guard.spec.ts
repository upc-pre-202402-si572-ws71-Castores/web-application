import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { CanActivateFn } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('authGuard', () => {
  let router: Router;
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    router = TestBed.inject(Router);
    spyOn(router, 'navigate'); // Espía la función de redirección
  });

  it('should allow access if token is present', () => {
    localStorage.setItem('token', 'fake-token'); // Simula un token en el almacenamiento local
    expect(executeGuard).toBeTrue(); // El guard debería permitir el acceso
  });

  it('should deny access and redirect if token is not present', () => {
    localStorage.removeItem('token'); // Asegura que no haya token
    expect(executeGuard).toBeFalse(); // El guard debería denegar el acceso
    expect(router.navigate).toHaveBeenCalledWith(['/auth/sign-in']); // Verifica que redirija al inicio de sesión
  });
});
