import { Component } from '@angular/core';
import {SignUpFormComponent} from "../../components/sign-up-form/sign-up-form.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true, // Declaramos como independiente
  imports: [CommonModule, SignUpFormComponent] // Importa el formulario
})
export class SignupPageComponent {}
