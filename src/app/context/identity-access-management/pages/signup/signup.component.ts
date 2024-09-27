import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/signup-form/signup-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true, // Declaramos como independiente
  imports: [CommonModule, LoginFormComponent] // Importa el formulario
})
export class SignupPageComponent {}