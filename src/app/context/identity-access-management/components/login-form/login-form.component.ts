import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
/*import { AuthService } from '../../services/auth.service';*/
import { HttpClientModule } from '@angular/common/http';  // Asegúrate de importar HttpClientModule


@Component({
    selector: 'app-login-form',
    standalone: true, // Indicamos que este componente es independiente
    imports: [
      CommonModule, 
      ReactiveFormsModule,
      MatInputModule,
      MatButtonModule,
      HttpClientModule,
      MatCheckboxModule,
      MatIconModule,
    ],
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css'],
  })

  export class LoginFormComponent {
    loginForm: FormGroup;
    hidePassword = true; // Para mostrar/ocultar contraseña
  
    constructor(private fb: FormBuilder) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        rememberMe: [false]
      });
    }
  
    onSubmit() {
      if (this.loginForm.valid) {
        console.log('Form Submitted', this.loginForm.value);
        // Aquí puedes manejar la autenticación
      }
    }
  
    togglePasswordVisibility() {
      this.hidePassword = !this.hidePassword;
    }

    /*loginForm: FormGroup;
    hidePassword = true; // Para mostrar/ocultar contraseña
    loginError = false;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        rememberMe: [false]
      });
    }
  
    onSubmit() {
      if (this.loginForm.valid) {
        const { username, password } = this.loginForm.value;
        
        // Aquí especificamos explícitamente el tipo de 'success' como boolean
        this.authService.login(username, password).subscribe((success: boolean) => {
          if (success) {
            // Redirige al usuario a 'app/create-request' si el login es exitoso
            this.router.navigate(['/app/create-request']);
          } else {
            // Muestra el mensaje de error si el login falla
            this.loginError = true;
          }
        });
      }
    }
  
    togglePasswordVisibility() {
      this.hidePassword = !this.hidePassword;
    }*/
  }