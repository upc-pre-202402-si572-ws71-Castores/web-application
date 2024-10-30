import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-client-page',
  templateUrl: './history-client.component.html',
  styleUrls: ['./history-client.component.css'],
  standalone: true, // Declaramos como independiente
  imports: [CommonModule] // Importa el formulario
})
export class HistoryClientPageComponent {}