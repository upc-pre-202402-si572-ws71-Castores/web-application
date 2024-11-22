import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {VehicleFormComponent} from "../../components/vehicle-form/vehicle-form.component";
import {MatDialog} from "@angular/material/dialog";
import {TransportappService} from "../../../../services/transportapp.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatFormField, MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-profile-carrier-page',
  templateUrl: './profile-carrier.component.html',
  styleUrls: ['./profile-carrier.component.css'],
  standalone: true, // Declaramos como independiente
  imports: [CommonModule, VehicleFormComponent, MatLabel, MatFormField, ReactiveFormsModule, FormsModule] // Importa el formulario
})
export class ProfileCarrierPageComponent {
  profile: any; // Perfil original
  editableProfile: any; // Perfil editable
  isEditing = false; // Estado para alternar entre los modos

  constructor(
    private dialog: MatDialog,
    private transportAppService: TransportappService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

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
        this.editableProfile = { ...profileData }; // Inicializa el perfil editable
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      },
    });
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;

    if (!this.isEditing) {
      this.editableProfile = { ...this.profile }; // Restaura los datos originales
    }
  }

  saveProfile(): void {
    const profileId = this.profile.id;

    if (!profileId) {
      console.error('Profile ID is missing');
      return;
    }

    this.transportAppService.updateProfile(profileId, this.editableProfile).subscribe({
      next: () => {
        this.profile = { ...this.editableProfile };
        this.isEditing = false; // Salir del modo edición
        alert('Profile updated successfully!');
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        alert('Failed to update profile. Please try again.');
      },
    });
  }

  openVehicleForm() {
    this.dialog.open(VehicleFormComponent, { width: '300px' });
  }
}
