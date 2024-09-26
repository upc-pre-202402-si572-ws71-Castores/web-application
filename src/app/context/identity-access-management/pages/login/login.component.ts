import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, // Declaramos como independiente
  imports: [CommonModule, LoginFormComponent] // Importa el formulario
})
export class LoginPageComponent {}