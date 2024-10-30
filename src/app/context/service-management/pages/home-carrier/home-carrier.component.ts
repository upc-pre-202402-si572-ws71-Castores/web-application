import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-carrier-page',
  templateUrl: './home-carrier.component.html',
  styleUrls: ['./home-carrier.component.css'],
  standalone: true, // Declaramos como independiente
  imports: [CommonModule] // Importa el formulario
})
export class HomeCarrierPageComponent {}