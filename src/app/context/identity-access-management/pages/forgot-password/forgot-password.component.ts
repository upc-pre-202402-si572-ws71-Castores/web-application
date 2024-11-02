import { Component } from '@angular/core';
import {ForgotPasswordFormComponent} from "../../components/forgot-password-form/forgot-password-form.component";
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: true, // Declaramos como independiente
  imports: [CommonModule, ForgotPasswordFormComponent, RouterLink] // Importa el formulario
})
export class ForgotPasswordPageComponent {}

