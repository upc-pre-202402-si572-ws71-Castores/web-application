import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderAuthComponent } from '../../components/auth/header/header.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterModule, HeaderAuthComponent],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent {}