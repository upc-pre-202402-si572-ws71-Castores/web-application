import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-client-page',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css'],
  standalone: true, // Declaramos como independiente
  imports: [CommonModule] // Importa el formulario
})
export class ProfileClientPageComponent {}