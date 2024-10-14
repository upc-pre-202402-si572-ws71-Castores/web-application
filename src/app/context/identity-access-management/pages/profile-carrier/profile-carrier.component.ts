import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-carrier-page',
  templateUrl: './profile-carrier.component.html',
  styleUrls: ['./profile-carrier.component.css'],
  standalone: true, // Declaramos como independiente
  imports: [CommonModule] // Importa el formulario
})
export class ProfileCarrierPageComponent {}