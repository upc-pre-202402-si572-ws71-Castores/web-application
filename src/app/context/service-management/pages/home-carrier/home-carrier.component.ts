import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-home-carrier-page',
  templateUrl: './home-carrier.component.html',
  styleUrls: ['./home-carrier.component.css'],
  standalone: true, // Declaramos como independiente
    imports: [CommonModule, MatIcon] // Importa el formulario
})
export class HomeCarrierPageComponent {}
