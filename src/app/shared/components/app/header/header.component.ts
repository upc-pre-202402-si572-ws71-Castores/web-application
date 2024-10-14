import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router'; // Importa RouterModule para routerLink

@Component({
  selector: 'app-header-app',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderAppComponent {
  isCarrier: boolean = true;  // Aquí podrías condicionar según el rol del usuario

  get homeRoute() {
    return this.isCarrier ? '/app/carrier' : '/app/client';
  }
}