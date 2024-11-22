import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import { TransportappService} from "../../../../services/transportapp.service";
import {
  TemperatureWeightChartComponent
} from "../../components/temperature-weight-chart/temperature-weight-chart.component";


@Component({
  selector: 'app-home-client-page',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css'],
  standalone: true,
  imports: [CommonModule,MatIcon,TranslateModule, TemperatureWeightChartComponent]
})
export class HomeClientPageComponent {
  request: any;
  intervalId: any; // Variable para guardar el identificador del intervalo

  temperatureData: number[] = [];
  weightData: number[] = [];
  timeLabels: string[] = [];

  constructor(private transportAppService: TransportappService) {}

  ngOnInit(): void {
    // Llama a la función una vez inmediatamente
    this.fetchRequest(1);

    // Configura el intervalo para actualizar cada 10 segundos
    this.intervalId = setInterval(() => {
      this.fetchRequest(1);
    }, 5000); // 5000 ms = 5 segundos
  }
  ngOnDestroy(): void {
    // Limpia el intervalo cuando se destruye el componente
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  fetchRequest(requestId: number): void {
    this.transportAppService.getRequestById(requestId).subscribe(
      (data) => {
        this.request = data; // Asigna la respuesta a la variable `request`
        console.log('Request fetched:', data);
        // Actualiza los datos del gráfico
        this.updateChartData(data?.idealTemperature, data?.idealWeight);

      },
      (error) => {
        console.error('Error fetching request:', error);
      }
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
