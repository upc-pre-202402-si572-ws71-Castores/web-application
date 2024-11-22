import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VehicleFormComponent} from "../../components/vehicle-form/vehicle-form.component";
import {MatDialog} from "@angular/material/dialog";
import {TransportappService} from "../../../../services/transportapp.service";

@Component({
  selector: 'app-profile-carrier-page',
  templateUrl: './profile-carrier.component.html',
  styleUrls: ['./profile-carrier.component.css'],
  standalone: true, // Declaramos como independiente
  imports: [CommonModule,VehicleFormComponent] // Importa el formulario
})
export class ProfileCarrierPageComponent {

  profile: any; // Para almacenar los datos del perfil

  constructor(private dialog: MatDialog, private transportAppService: TransportappService) {}

  openVehicleForm() {
    this.dialog.open(VehicleFormComponent, {
      width: '300px'
    });
    console.log('Opening vehicle form');
    // Aquí puedes abrir un modal o redirigir a otro componente para agregar un vehículo
  }

  ngOnInit(): void {
    // Obtén el ID del perfil actual desde el almacenamiento local o el servicio de autenticación
    const userId = localStorage.getItem('userId'); // Asegúrate de que el userId se almacene al iniciar sesión

    if (userId) {
      this.fetchProfile(userId);
    } else {
      console.error('No user ID found in localStorage');
    }
  }

  fetchProfile(userId: string): void {
    this.transportAppService.getProfileById(userId).subscribe({
      next: (profileData) => {
        this.profile = profileData;
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      },
    });
  }
}
