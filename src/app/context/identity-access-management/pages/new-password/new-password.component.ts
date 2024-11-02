import { Component } from '@angular/core';
import {NewPasswordFormComponent} from "../../components/new-password-form/new-password-form.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-password-page',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
  standalone: true, // Declaramos como independiente
  imports: [CommonModule, NewPasswordFormComponent] // Importa el formulario
})
export class NewPasswordComponent {}
