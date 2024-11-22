import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TemperatureWeightChartComponent } from '../../components/temperature-weight-chart/temperature-weight-chart.component';
import { TransportappService } from '../../../../services/transportapp.service';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-home-carrier-page',
  templateUrl: './home-carrier.component.html',
  styleUrls: ['./home-carrier.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule, TemperatureWeightChartComponent, MatIcon],
})
export class HomeCarrierPageComponent {
  request: any;
  intervalId: any;

  temperatureData: number[] = [];
  weightData: number[] = [];
  timeLabels: string[] = [];

  constructor(private transportAppService: TransportappService) {}

  ngOnInit(): void {
    this.fetchRequest(1);
    this.intervalId = setInterval(() => this.fetchRequest(1), 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fetchRequest(requestId: number): void {
    this.transportAppService.getRequestById(requestId).subscribe(
      (data) => {
        this.request = data;
        console.log('Request fetched:', data);
        this.updateChartData(data?.idealTemperature, data?.idealWeight);
      },
      (error) => console.error('Error fetching request:', error)
    );
  }

  updateChartData(temperature: number, weight: number) {
    const currentTime = new Date().toLocaleTimeString();

    this.temperatureData = [...this.temperatureData, temperature || 20];
    this.weightData = [...this.weightData, weight || 50];
    this.timeLabels = [...this.timeLabels, currentTime];

    if (this.temperatureData.length > 10) {
      this.temperatureData.shift();
      this.weightData.shift();
      this.timeLabels.shift();
    }
  }
}
