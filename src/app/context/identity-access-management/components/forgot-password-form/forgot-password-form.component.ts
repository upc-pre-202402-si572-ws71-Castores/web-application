import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import { Router } from '@angular/router'; // Asegúrate de importar el Router

@Component({
  selector: 'app-forgot-password-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    RouterLink,
  ],

  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css'],
  standalone: true
})
export class ForgotPasswordFormComponent {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      console.log('Reset Password Request:', this.forgotPasswordForm.value);
      // Aquí puedes manejar la solicitud de restablecimiento de contraseña, como enviar la información al backend
    }
  }

  goToLogin() {
    this.router.navigate(['/auth/sign-in']); // Cambia '/login' por la ruta que usas para el login
  }

  goToNewPassword() {
    this.router.navigate(['/auth/new-password']); // Cambia '/login' por la ruta que usas para el login
  }
}
