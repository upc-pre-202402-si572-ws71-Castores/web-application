import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import {Router, RouterLink} from "@angular/router";
import { TransportappService} from "../../../../services/transportapp.service";

@Component({
    selector: 'app-login-form',
    standalone: true, // Indicamos que este componente es independiente
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    RouterLink,
  ],
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css'],
  })

  export class LoginFormComponent {
    loginForm: FormGroup;
    hidePassword = true; // Para mostrar/ocultar contraseña

  constructor(private fb: FormBuilder, private router: Router, private transportAppService: TransportappService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],  // Cambiado a 'username'
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.transportAppService.signIn(this.loginForm.value).subscribe(
        response => {
          // Manejo de autenticación exitosa (almacena el token si se incluye en la respuesta)
          localStorage.setItem('token', response.token);  // Ajusta según la estructura de tu respuesta
          this.router.navigate(['/auth/Dashboard']); // Redirige al usuario a la página principal
        },
        error => {
          console.error('Error de autenticación:', error);
          alert('Credenciales incorrectas');
        }
      );
    }
  }

    togglePasswordVisibility() {
      this.hidePassword = !this.hidePassword;
    }
  goToDashboard() {
    this.router.navigate(['/auth/dashboard']); // Cambia '/login' por la ruta que usas para el login
  }

  }
