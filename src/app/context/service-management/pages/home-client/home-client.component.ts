import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-home-client-page',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css'],
  standalone: true,
  imports: [CommonModule,MatIcon,RouterLink,TranslateModule]
})
export class HomeClientPageComponent {

}
