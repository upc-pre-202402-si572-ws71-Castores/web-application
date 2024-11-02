import { Component } from '@angular/core';
import {NewAccountFormComponent} from "../../components/new-account-form/new-account-form.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-account-page',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  standalone: true, // Declaramos como independiente
  imports: [CommonModule, NewAccountFormComponent] // Importa el formulario
})

export class NewAccountComponent {}
