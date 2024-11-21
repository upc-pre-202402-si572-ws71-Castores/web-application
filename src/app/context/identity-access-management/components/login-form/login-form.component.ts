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
    errorMessage: string | null = null; // Para almacenar mensajes de error



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
          const { token, id } = response;
          localStorage.setItem('token', token);
          localStorage.setItem('userId', id.toString());
  
          this.transportAppService.getUserRole(id).subscribe(
            user => {
              if (user.roles && user.roles.length > 0) {
                const role = user.roles[0];
                if (role === 'ROLE_CLIENT') {
                  this.router.navigate(['/app/client']);
                } else if (role === 'ROLE_TRANSPORTER') {
                  this.router.navigate(['/app/carrier']);
                } else {
                  alert('Rol no reconocido. Contacta con soporte.');
                }
              } else {
                console.error('No se encontró el rol del usuario.');
                this.errorMessage = 'Error: no se encontró el rol del usuario.';
              }
            },
            error => {
              console.error('Error obteniendo el rol del usuario:', error);
              this.errorMessage = 'Error al obtener los datos del usuario.';
            }
          );
        },
        error => {
          if (error.status === 401) {
            this.errorMessage = 'Credenciales incorrectas. Por favor, inténtalo nuevamente.';
          } else {
            this.errorMessage = 'Ocurrió un error en la autenticación. Inténtalo más tarde.';
          }
          console.error('Error de autenticación:', error);
        }
      );
    }
  }


  togglePasswordVisibility() {
      this.hidePassword = !this.hidePassword;
  }



  }
