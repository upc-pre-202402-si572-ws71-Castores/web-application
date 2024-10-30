import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common'; // Importa el CommonModule para *ngIf y *ngFor
import { RouterModule } from '@angular/router'; // Importa RouterModule para routerLink

@Component({
  selector: 'app-sidebar-app',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule, RouterModule  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarAppComponent {
    isCarrier: boolean = false; // Aquí podrías condicionar según el rol del usuario
  
    carrierRoutes = [
      { path: 'carrier', label: 'Dashboard', icon: 'home_outline' },
      { path: 'carrier/see-offers', label: 'See offers', icon: 'local_offer_outline' },
      { path: 'carrier/history', label: 'History', icon: 'history_outline' },
    ];
  
    clientRoutes = [
      { path: 'client', label: 'Dashboard', icon: 'home_outline' },
      { path: 'client/create-request', label: 'Create Request', icon: 'add_circle_outline' },
      { path: 'client/history', label: 'History', icon: 'history_outline' },
    ];
  }