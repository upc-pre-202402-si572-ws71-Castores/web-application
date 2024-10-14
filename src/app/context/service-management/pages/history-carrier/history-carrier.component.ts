import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-carrier-page',
  templateUrl: './history-carrier.component.html',
  styleUrls: ['./history-carrier.component.css'],
  standalone: true, // Declaramos como independiente
  imports: [CommonModule] // Importa el formulario
})
export class HistoryCarrierPageComponent {}