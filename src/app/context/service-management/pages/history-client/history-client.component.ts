import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {TransportappService} from "../../../../services/transportapp.service";

@Component({
  selector: 'app-history-client-page',
  templateUrl: './history-client.component.html',
  styleUrls: ['./history-client.component.css'],
  standalone: true, // Declaramos como independiente
    imports: [CommonModule, FontAwesomeModule, MatButtonModule, MatDialogModule, TranslateModule] // Importa el formulario
})
export class HistoryClientPageComponent implements OnInit {
  offers: any[] = []; // Almacena todas las ofertas obtenidas del backend
  faMapMarkerAlt = faMapMarkerAlt;
  constructor(private transportAppService: TransportappService) {}

  ngOnInit(): void {
    this.fetchOffers();
  }

  fetchOffers(): void {
    const maxOffers = 10; // Número máximo de ofertas a buscar
    for (let offerId = 1; offerId <= maxOffers; offerId++) {
      this.transportAppService.getOfferById(offerId).subscribe({
        next: (offer) => {
          if (offer) {
            this.offers.push(offer);
          }
        },
        error: (err) => {
          console.warn(`Offer ID ${offerId} not found or error occurred`, err);
        },
      });
    }
  }
}
