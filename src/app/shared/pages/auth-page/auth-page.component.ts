import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderAuthComponent } from '../../components/auth/header/header.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'auth-page',
  standalone: true,
  imports: [RouterModule, HeaderAuthComponent, HttpClientModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent {}
