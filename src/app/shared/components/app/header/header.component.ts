import {ChangeDetectionStrategy, Component, ChangeDetectorRef,signal} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldControl, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMenuModule} from "@angular/material/menu";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod'; // Ajusta el path si es necesario

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header-app',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    TranslateModule,
    MatMenuModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderAppComponent {
  isCarrier: boolean = true; // Aquí podrías condicionar según el rol del usuario
  readonly panelOpenState = signal(false);
  // para el lenguaje
  currentLang = 'en.json';
  languages = ['es', 'en.json'];

  userName: string = ''; // Variable para almacenar el nombre del usuario
  private baseUrl = environment.apiUrl; // Usando la URL de environment


  constructor(private translate: TranslateService, private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef ) {
    this.currentLang = translate.currentLang;
  }
  ngOnInit(): void {
    const role = localStorage.getItem('userRole');
    this.isCarrier = role === 'ROLE_TRANSPORTER';
    const profileId = this.isCarrier ? 2 : 1; // ID 2 para transportista, ID 1 para cliente

    this.getUserProfile(profileId).subscribe(profile => {
      this.userName = profile.fullName; // Asigna el nombre obtenido al usuario
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
  }


  useLanguage(language: string): void {
    this.currentLang= language;
    this.translate.use(language);
  }

  get homeRoute() {
    if (typeof window !== 'undefined' && localStorage) {
      const role = localStorage.getItem('userRole');
      return role === 'ROLE_TRANSPORTER' ? '/app/carrier' : '/app/client';
    }
    return '/auth/sign-in'; // Ruta de fallback si localStorage no está disponible
  }
  
  logout(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId')
      this.router.navigate(['/auth/sign-in']);
    }
  }

  getUserProfile(profileId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const url = `${this.baseUrl}/profiles/${profileId}`; // Usa apiURL en la construcción de la URL
    return this.http.get<any>(url, { headers });
  }

}
