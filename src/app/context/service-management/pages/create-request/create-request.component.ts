import { Component } from '@angular/core';
import { CreateRequestFormComponent } from '../../components/create-request-form/create-request-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-request-page',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css'],
  standalone: true, // Declaramos como independiente
  imports: [CommonModule, CreateRequestFormComponent] // Importa el formulario
})
export class CreateRequestPageComponent {}