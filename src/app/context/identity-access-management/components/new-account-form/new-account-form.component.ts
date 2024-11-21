import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TransportappService } from '../../../../services/transportapp.service'; // Ajusta el path según tu estructura de carpetas

@Component({
  selector: 'app-new-account-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './new-account-form.component.html',
  styleUrls: ['./new-account-form.component.css'],
})

export class NewAccountFormComponent {
  newAccountForm: FormGroup;
  hidePassword = true; // Para mostrar/ocultar contraseña

  constructor(private fb: FormBuilder, private transportAppService: TransportappService) {
    this.newAccountForm = this.fb.group({
      fullName: ['', [Validators.required]],
      province: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      phoneName: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      descriptionProfile: ['', [Validators.required]]
    });
  }

  signIn() {
    // Recuperar email y contraseña de localStorage
    const email = localStorage.getItem('userEmail');
    const password = localStorage.getItem('userPassword');

    if (!email || !password) {
      console.error('No se encontraron credenciales almacenadas.');
      return;
    }

    // Llamar al método signIn del servicio
    this.transportAppService.signIn({ username: email, password }).subscribe(
      response => {
        console.log('Inicio de sesión exitoso:', response);
        const token = response.token;

        // Guardar el token en localStorage
        localStorage.setItem('token', token);

        // Opcional: Guardar el ID del usuario para futuras consultas
        localStorage.setItem('userId', response.id.toString());
      },
      error => {
        console.error('Error en el inicio de sesión:', error);
      }
    );
  }
  onSubmit() {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No hay token de autenticación. Por favor, inicia sesión primero.');
      return;
    }

    if (this.newAccountForm.valid) {
      const profileData = this.newAccountForm.value;

      // Llamar al método createProfile del servicio
      this.transportAppService.createProfile(profileData).subscribe(
        response => {
          console.log('Perfil creado exitosamente:', response);
        },
        error => {
          console.error('Error al crear el perfil:', error);
        }
      );
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
