import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-see-offers-page',
  templateUrl: './see-offers.component.html',
  styleUrls: ['./see-offers.component.css'],
  standalone: true, // Declaramos como independiente
  imports: [CommonModule] // Importa el formulario
})
export class SeeOffersPageComponent {}