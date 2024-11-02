import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";

// Define la interfaz Route para especificar la estructura de cada ruta
interface Route {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar-app',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule, RouterModule, TranslateModule ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarAppComponent {
  isCarrier: boolean = false;
  routes: Route[] = []; // Especifica el tipo de rutas como Route[]


  carrierRoutes: Route[] = [
    { path: '/app/carrier', label: 'dashboard', icon: 'home_outline' },
    { path: '/app/carrier/see-offers', label: 'seeoffers', icon: 'local_offer_outline' },
    { path: '/app/carrier/history', label: 'history', icon: 'history_outline' },
  ];
  
  clientRoutes: Route[] = [
    { path: '/app/client', label: 'dashboard', icon: 'home_outline' },
    { path: '/app/client/create-request', label: 'createrequest', icon: 'add_circle_outline' },
    { path: '/app/client/history', label: 'history', icon: 'history_outline' },
  ];
  ngOnInit(): void {
    const role = localStorage.getItem('userRole');
    this.isCarrier = role === 'ROLE_TRANSPORTER'; // Verifica si el usuario es transportista
    this.routes = this.isCarrier ? this.carrierRoutes : this.clientRoutes; // Asigna las rutas según el rol
  }
}
