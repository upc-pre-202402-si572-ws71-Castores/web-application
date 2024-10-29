import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-history-carrier-page',
  templateUrl: './history-carrier.component.html',
  styleUrls: ['./history-carrier.component.css'],
  standalone: true, // Declaramos como independiente
    imports: [CommonModule,FontAwesomeModule,MatButtonModule, MatDialogModule] // Importa el formulario
})
export class HistoryCarrierPageComponent {
  faMapMarkerAlt = faMapMarkerAlt;
}
