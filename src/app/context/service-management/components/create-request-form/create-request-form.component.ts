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
import {TranslateModule} from "@ngx-translate/core";

@Component({
    selector: 'app-create-request-form',
    standalone: true, // Indicamos que este componente es independiente
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

    constructor(private fb: FormBuilder) {
      this.requestForm = this.fb.group({
        vehicleType: ['', Validators.required],
        startLocation: ['', Validators.required],
        temperature: ['', Validators.required],
        arrivalPlace: ['', Validators.required],
        weight: ['', Validators.required],
        price: ['', Validators.required],
        description: [''],
      });
    }

    onSubmit() {
      if (this.requestForm.valid) {
        console.log('Form Data:', this.requestForm.value);
      }
    }

  }
