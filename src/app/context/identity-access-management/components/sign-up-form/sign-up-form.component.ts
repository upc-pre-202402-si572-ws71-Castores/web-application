import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {Router, RouterLink} from "@angular/router";
import { TransportappService} from "../../../../services/transportapp.service";

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'],
})

export class SignUpFormComponent {
  signUpForm: FormGroup;
  hidePassword = true; // Para mostrar/ocultar contraseña

  constructor(private fb: FormBuilder, private transportAppService: TransportappService, private router: Router) {
    this.signUpForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: this.passwordsMatch });
  }

  onSubmit() {
    const signUpData = {
      username: this.signUpForm.value.email, // Usa el email como username
      password: this.signUpForm.value.password,
      roles: ["ROLE_CLIENT"] // Asigna automáticamente el rol de cliente
    };

    this.transportAppService.signUp(signUpData).subscribe(
      response => {
        console.log("Registro exitoso:", response);
        this.router.navigate(['/auth/sign-in']);
      },
      error => {
        console.error("Error en el registro:", error);
      }
    );
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  // Validador personalizado para que las contraseñas coincidan
  passwordsMatch(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  goToNewAccount() {
    this.router.navigate(['/auth/new-account']); // Cambia '/login' por la ruta que usas para el login
  }

}
