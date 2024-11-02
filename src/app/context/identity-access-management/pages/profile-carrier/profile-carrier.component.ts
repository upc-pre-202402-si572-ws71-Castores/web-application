import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VehicleFormComponent} from "../../components/vehicle-form/vehicle-form.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-profile-carrier-page',
  templateUrl: './profile-carrier.component.html',
  styleUrls: ['./profile-carrier.component.css'],
  standalone: true, // Declaramos como independiente
  imports: [CommonModule,VehicleFormComponent] // Importa el formulario
})
export class ProfileCarrierPageComponent {
  constructor(private dialog: MatDialog) {}

  openVehicleForm() {
    this.dialog.open(VehicleFormComponent, {
      width: '300px'
    });
  }
}
