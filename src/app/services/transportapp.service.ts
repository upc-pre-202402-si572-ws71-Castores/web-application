import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransportappService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }
  signIn(credentials: { username: string, password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/api/v1/authentication/sign-in`, credentials);
  }

  // Método para registrarse
  signUp(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/authentication/sign-up`, data);
  }
}
