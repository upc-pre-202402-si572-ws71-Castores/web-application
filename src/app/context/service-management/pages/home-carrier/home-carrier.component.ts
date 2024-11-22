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
  activeAlarms: { temperature: boolean; weight: boolean } = { temperature: false, weight: false };
  alarms: { message: string; timestamp: string; type: string }[] = [];
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

        this.checkForTemperatureAlarm();
        this.checkForWeightAlarm();
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
  checkForTemperatureAlarm(): void {
    if (this.request?.idealTemperature && this.request?.idealTemperature > 16) {
      if (!this.activeAlarms.temperature) {
        const exceededBy = this.request.idealTemperature - 16;
        const message = `Temperature exceeded by ${exceededBy.toFixed(1)}°C`;
        const timestamp = new Date().toLocaleTimeString();
        this.addAlarm(message, timestamp, 'red');
        this.activeAlarms.temperature = true; // Marca la alarma como activa
      }
    } else {
      this.activeAlarms.temperature = false; // Reinicia si vuelve al rango normal
    }
  }
  checkForWeightAlarm(): void {
    if (this.request?.idealWeight && this.request?.idealWeight > 20) {
      if (!this.activeAlarms.weight) {
        const exceededBy = this.request.idealWeight - 20;
        const message = `Weight exceeded by ${exceededBy.toFixed(1)} Kg`;
        const timestamp = new Date().toLocaleTimeString();
        this.addAlarm(message, timestamp, 'red');
        this.activeAlarms.weight = true; // Marca la alarma como activa
      }
    } else {
      this.activeAlarms.weight = false; // Reinicia si vuelve al rango normal
    }
  }
  addAlarmToList(alarm: { message: string; timestamp: string; type: string }): void {
    const alarmsList = document.getElementById('alarm-list');
    if (alarmsList) {
      const newAlarm = document.createElement('li');
      newAlarm.className = 'notification-item'; // Aplica la clase principal
      newAlarm.innerHTML = `
        <span class="dot ${alarm.type}"></span>
        <div class="notification-content">
          <span>${alarm.message}</span>
          <p class="timestamp">${alarm.timestamp}</p>
        </div>
      `;
      alarmsList.prepend(newAlarm);
      newAlarm.offsetHeight; // Trigger repaint

    }
  }
  addAlarm(message: string, timestamp: string, type: string): void {
    // Verifica si ya existe una alarma similar
    const exists = this.alarms.find(
      (alarm) => alarm.message === message && alarm.type === type
    );
    if (!exists) {
      this.alarms.unshift({ message, timestamp, type }); // Añade la nueva alarma al inicio
    }
  }
  
}
