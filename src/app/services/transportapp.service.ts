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
  getRequestById(requestId: number): Observable<any> {
    const token = localStorage.getItem('token'); // Obtiene el token almacenado
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en la cabecera
      Accept: 'application/json', // Define que la respuesta debe ser JSON
    });

    return this.http.get<any>(`${this.baseUrl}/request/${requestId}`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching request:', error);
        return throwError(error); // Propaga el error si ocurre
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

  // PUT CREATE REQUEST
  createRequest(requestData: {
    startLocation: string;
    arrivalPlace: string;
    descriptionRequest: string;
    idealTemperature: number;
    idealWeight: number;
    offeredPrice: number;
  }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${this.baseUrl}/request`, requestData, { headers });
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

  createProfile(profileData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Si es necesario autenticar la solicitud
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.baseUrl}/api/v1/profiles`, profileData, { headers }).pipe(
      tap(response => {
        console.log('Profile created successfully:', response);
      }),
      catchError(error => {
        console.error('Error creating profile:', error);
        return throwError(error);
      })
    );
  }
}
