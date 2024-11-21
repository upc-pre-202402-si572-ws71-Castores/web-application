import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from "@ngx-translate/core";
import { TransportappService} from "../../../../services/transportapp.service";// Ajusta la ruta según sea necesario

@Component({
  selector: 'app-create-request-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    TranslateModule
  ],
  templateUrl: './create-request-form.component.html',
  styleUrls: ['./create-request-form.component.css'],
})
export class CreateRequestFormComponent {
  requestForm: FormGroup;

  constructor(private fb: FormBuilder, private transportAppService: TransportappService) {
    this.requestForm = this.fb.group({
      vehicleType: ['', Validators.required], // Si es necesario enviar el tipo de vehículo
      startLocation: ['', Validators.required],
      temperature: [0, [Validators.required, Validators.min(-50), Validators.max(50)]],
      arrivalPlace: ['', Validators.required],
      weight: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: [''],
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const requestData = {
        startLocation: this.requestForm.value.startLocation,
        arrivalPlace: this.requestForm.value.arrivalPlace,
        descriptionRequest: this.requestForm.value.description,
        idealTemperature: this.requestForm.value.temperature,
        idealWeight: this.requestForm.value.weight,
        offeredPrice: this.requestForm.value.price
      };

      this.transportAppService.createRequest(requestData).subscribe({
        next: (response) => {
          console.log('Request created successfully:', response);
          alert('Request created successfully!');
          this.requestForm.reset();
        },
        error: (err) => {
          console.error('Error creating request:', err);
          alert('Failed to create request. Please try again.');
        }
      });
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}
