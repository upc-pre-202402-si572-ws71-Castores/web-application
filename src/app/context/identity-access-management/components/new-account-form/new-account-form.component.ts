import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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

  constructor(private fb: FormBuilder) {
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

  onSubmit() {
    if (this.newAccountForm.valid) {
      console.log('Account Created:', this.newAccountForm.value);
      // Aquí puedes manejar la creación de la cuenta, como enviar la información al backend
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
