import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-sign-up-form',
    standalone: true, // Indicamos que este componente es independiente
    imports: [
      CommonModule, 
      ReactiveFormsModule,
      MatInputModule,
      MatButtonModule,
      MatCheckboxModule,
      MatIconModule,
    ],
    templateUrl: './sign-up-form.component.html',
    styleUrls: ['./sign-up-form.component.css'],
  })

  export class SignupFormComponent {

  }