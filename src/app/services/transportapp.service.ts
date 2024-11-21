import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {Observable} from "rxjs";
import { environment } from '../environments/environment.prod'; // Ajusta el path si es necesario
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TransportappService {

  private baseUrl = environment.apiUrl; // Usando la URL de environment

  constructor(private http: HttpClient) { }
  signIn(credentials: { username: string, password: string }): Observable<{ id: number, token: string }> {
    return this.http.post<{ id: number, token: string }>(`${this.baseUrl}/authentication/sign-in`, credentials);
  }

  getUserRole(userId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.baseUrl}/users/${userId}`, { headers }).pipe(
      tap(response => {
        // Guardar el primer rol del array roles en el localStorage
        const userRole = response.roles[0];
        localStorage.setItem('userRole', userRole);
      })
    );
  }

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${this.baseUrl}/users`, { headers });
  }
  // GET SEE-OFFER
  getOfferById(offerId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${this.baseUrl}/request/${offerId}`, { headers });
  }

  // Metodo para registrarse
  signUp(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/authentication/sign-up`, data);
  }
}
