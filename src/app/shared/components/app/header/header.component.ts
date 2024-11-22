import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod'; // Ajusta el path si es necesario

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
  styleUrls: ['./header.component.css'], // Corrige el nombre de la propiedad "styleUrls"
})
export class HeaderAppComponent {
  isCarrier: boolean = true; // Determina si el usuario es transportista
  readonly panelOpenState = signal(false);

  // Manejo del idioma
  currentLang = 'en.json';
  languages = ['es', 'en.json'];

  userName: string = ''; // Almacena el nombre del usuario
  private baseUrl = environment.apiUrl; // Base URL del API

  constructor(
    private translate: TranslateService,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    this.currentLang = translate.currentLang;
  }

  ngOnInit(): void {
    const role = localStorage.getItem('userRole');
    this.isCarrier = role === 'ROLE_TRANSPORTER';

    const userId = localStorage.getItem('userId'); // Obtiene el ID del usuario del localStorage
    if (userId) {
      this.getUserProfile(userId).subscribe({
        next: (profile) => {
          this.userName = profile.fullName; // Asigna el nombre del usuario
          this.cdr.detectChanges(); // Forzar la detección de cambios
        },
        error: (err) => {
          console.error('Error fetching user profile:', err);
        },
      });
    } else {
      console.warn('User ID not found in localStorage.');
    }
  }

  useLanguage(language: string): void {
    this.currentLang = language;
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
      localStorage.removeItem('userId');
      this.router.navigate(['/auth/sign-in']);
    }
  }

  navigateToProfile(event: Event): void {
    // Evita que el evento se propague al botón de logout
    event.stopPropagation();

    // Redirige a la ruta según el rol del usuario
    const role = localStorage.getItem('userRole');
    const profileRoute = role === 'ROLE_TRANSPORTER' ? 'app/carrier/profile' : 'app/client/profile';
    this.router.navigate([profileRoute]);
  }


  getUserProfile(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.baseUrl}/profiles/${userId}`;
    return this.http.get<any>(url, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching profile by ID:', error);
        return of(null); // Retorna un observable nulo en caso de error
      })
    );
  }
}
