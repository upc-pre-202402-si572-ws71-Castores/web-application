import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-new-password-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './new-password-form.component.html',
  styleUrls: ['./new-password-form.component.css'],
})

export class NewPasswordFormComponent {
  newPasswordForm: FormGroup;
  hidePassword = true; // Para mostrar/ocultar contraseña

  constructor(private fb: FormBuilder) {
    this.newPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: this.passwordsMatch });
  }

  onSubmit() {
    if (this.newPasswordForm.valid) {
      console.log('New Password Form Submitted', this.newPasswordForm.value);
      // Aquí puedes manejar el proceso de restablecimiento de contraseña
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  // Validador personalizado para asegurarse de que las contraseñas coincidan
  passwordsMatch(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }
}
