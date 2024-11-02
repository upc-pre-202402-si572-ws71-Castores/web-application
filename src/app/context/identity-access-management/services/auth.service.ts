/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/enviroment';  
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';  // Agregamos el import de Observable

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = environment.apiUrl;  // Usa la URL desde el archivo de environment

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiURL}?username=${username}`).pipe(
      map((users: any[]) => {
        const user = users.find(u => u.username === username);
        if (user && password === '1234') {  // Simulamos una validación con password '1234'
          localStorage.setItem('user', JSON.stringify(user));
          return true;
        }
        return false;
      }),
      catchError(() => of(false))  // Si hay algún error, devolvemos false
    );
  }


  isLoggedIn() {
    return !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/auth/sign-in']);
  }
}*/