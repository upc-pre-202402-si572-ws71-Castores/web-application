import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-history-carrier-page',
  templateUrl: './history-carrier.component.html',
  styleUrls: ['./history-carrier.component.css'],
  standalone: true,
    imports: [CommonModule,FontAwesomeModule,MatButtonModule, MatDialogModule,TranslateModule ]
})
export class HistoryCarrierPageComponent {
  faMapMarkerAlt = faMapMarkerAlt;
}
