import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportappService} from "../../../../services/transportapp.service";

@Component({
  selector: 'app-profile-client-page',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProfileClientPageComponent {
  profile: any; // Para almacenar los datos del perfil

  constructor(private transportAppService: TransportappService) {}

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

  openVehicleForm(): void {
    console.log('Opening vehicle form');
    // Aquí puedes abrir un modal o redirigir a otro componente para agregar un vehículo
  }

}
