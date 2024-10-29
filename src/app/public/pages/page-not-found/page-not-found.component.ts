import { Component } from '@angular/core';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [MatIcon,MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

}
