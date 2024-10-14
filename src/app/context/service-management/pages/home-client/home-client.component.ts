import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-client-page',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css'],
  standalone: true, // Declaramos como independiente
  imports: [CommonModule] // Importa el formulario
})
export class HomeClientPageComponent {}