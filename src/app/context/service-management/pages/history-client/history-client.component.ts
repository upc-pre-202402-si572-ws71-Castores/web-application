import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-history-client-page',
  templateUrl: './history-client.component.html',
  styleUrls: ['./history-client.component.css'],
  standalone: true, // Declaramos como independiente
    imports: [CommonModule, FontAwesomeModule, MatButtonModule, MatDialogModule, TranslateModule] // Importa el formulario
})
export class HistoryClientPageComponent {
  faMapMarkerAlt = faMapMarkerAlt;
}
