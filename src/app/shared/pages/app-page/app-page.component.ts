import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderAppComponent } from '../../components/app/header/header.component';
import { SidebarAppComponent } from '../../components/app/sidebar/sidebar.component'

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterModule, HeaderAppComponent, SidebarAppComponent],
  templateUrl: './app-page.component.html',
  styleUrl: './app-page.component.css',
})
export class AppPageComponent {}