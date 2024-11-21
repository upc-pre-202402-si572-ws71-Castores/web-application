import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { TransportappService} from "../../../../services/transportapp.service";

@Component({
  selector: 'app-see-offers-page',
  templateUrl: './see-offers.component.html',
  styleUrls: ['./see-offers.component.css'],
  standalone: true, // Declaramos como independiente
  imports: [CommonModule,FontAwesomeModule,MatButtonModule, MatDialogModule] // Importa el formulario
})
export class SeeOffersPageComponent implements OnInit{
  faMapMarkerAlt = faMapMarkerAlt;
  offers: any[] = []; // Array para almacenar las ofertas
  states: { [key: number]: string } = {}; // Almacena el estado de cada oferta por ID

  constructor(private transportAppService: TransportappService) {}

  ngOnInit(): void {
    this.fetchOffers([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }

  fetchOffers(offerIds: number[]): void {
    offerIds.forEach(id => {
      this.transportAppService.getOfferById(id).subscribe({
        next: (data) => {
          this.offers.push(data);
          this.states[data.id] = 'default'; // Inicializa el estado de la oferta como 'default'
        },
        error: (err) => {
          console.error(`Error fetching offer with ID ${id}:`, err);
        }
      });
    });
  }

  confirmOffer(offerId: number): void {
    this.states[offerId] = 'confirmed'; // Cambia el estado a 'confirmed'
  }

  declineOffer(offerId: number): void {
    if (this.states[offerId] === 'confirmed') {
      this.states[offerId] = 'default'; // Si está confirmado, vuelve al estado original
    } else {
      delete this.states[offerId]; // Si no está confirmado, oculta la tarjeta
      this.offers = this.offers.filter(offer => offer.id !== offerId);
    }
  }
}
