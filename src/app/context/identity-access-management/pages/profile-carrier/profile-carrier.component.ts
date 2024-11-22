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
export class ProfileCarrierPageComponent implements OnInit {
  profile: any; // Datos del perfil
  isEditing: boolean = false; // Estado de edición
  editForm: FormGroup; // Formulario reactivo para edición

  constructor(
    private transportAppService: TransportappService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.editForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      address: [''],
      birthday: [''],
      dni: [''],
      phone: [''],
    });
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); // ID del usuario actual

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

        // Actualizar formulario con datos actuales del perfil
        this.editForm.patchValue({
          firstName: profileData.fullName.split(' ')[0],
          lastName: profileData.fullName.split(' ')[1] || '',
          email: profileData.email,
          address: profileData.city,
          birthday: profileData.birthday,
          dni: profileData.dni,
          phone: profileData.phone,
        });
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      },
    });
  }

  enableEdit(): void {
    this.isEditing = true; // Activa el modo edición
  }

  saveChanges(): void {
    if (this.editForm.valid) {
      const updatedProfile = { ...this.editForm.value, id: this.profile.id };

      this.transportAppService.updateProfile(updatedProfile).subscribe({
        next: () => {
          this.isEditing = false; // Desactiva el modo edición
          this.profile = { ...this.profile, ...updatedProfile }; // Actualiza el perfil local
          this.snackBar.open('Profile updated successfully!', 'Close', {
            duration: 3000,
          });
        },
        error: (err) => {
          console.error('Error updating profile:', err);
          this.snackBar.open('Failed to update profile.', 'Close', {
            duration: 3000,
          });
        },
      });
    }
  }
  openVehicleForm(): void {
    this.dialog.open(VehicleFormComponent, {
      width: '400px',
    }).afterClosed().subscribe(result => {
      if (result) {
        console.log('Vehicle form data:', result);
        // Aquí puedes manejar el resultado del formulario si es necesario
      }
    });
  }
  cancelEdit(): void {
    this.isEditing = false; // Cancela edición
  }
}
