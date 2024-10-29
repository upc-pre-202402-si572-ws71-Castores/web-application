import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldControl, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMenuModule} from "@angular/material/menu"; // Importa RouterModule para routerLink

@Component({
  selector: 'app-header-app',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule,MatExpansionModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,MatMenuModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderAppComponent {
  isCarrier: boolean = true;  // Aquí podrías condicionar según el rol del usuario
  readonly panelOpenState = signal(false);
  get homeRoute() {
    return this.isCarrier ? '/app/carrier' : '/app/client';
  }
}
