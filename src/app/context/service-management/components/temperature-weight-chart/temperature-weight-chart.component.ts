import { Component, Input, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-temperature-weight-chart',
  template: `<canvas #chartCanvas></canvas>`,
  styleUrls: ['./temperature-weight-chart.component.css'],
  standalone: true,
})
export class TemperatureWeightChartComponent implements OnInit, OnDestroy {
  @Input() temperatureData: number[] = [];
  @Input() weightData: number[] = [];
  @Input() labels: string[] = [];

  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart!: Chart;

  ngOnInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  ngOnChanges(): void {
    if (this.chart) {
      this.chart.data.datasets[0].data = this.temperatureData;
      this.chart.data.datasets[1].data = this.weightData;
      this.chart.data.labels = this.labels;
      this.updateYAxisRange();
      this.chart.update();
    }
  }

  private createChart() {
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: this.temperatureData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            fill: false,
            tension: 0.4,
          },
          {
            label: 'Weight (Kg)',
            data: this.weightData,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            fill: false,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            onClick: (event, legendItem, legend) => {
              const chart = legend.chart;
              const datasetIndex = (legendItem as any).datasetIndex;

              if (datasetIndex !== undefined) {
                const dataset = chart.data.datasets[datasetIndex];
                dataset.hidden = !dataset.hidden; // Alternar visibilidad
                this.updateYAxisRange(chart);
                chart.update();
              }
            },
          },
        },
        scales: {
          x: {
            title: { display: true, text: 'Time (s)' },
          },
          y: {
            title: { display: true, text: 'Value' },
            min: 0,
            max: 50, // Valor inicial, se actualizará dinámicamente
          },
        },
      },
    };

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, config);
    }
  }

  private updateYAxisRange(chart: Chart = this.chart): void {
    const datasets = chart.data.datasets;

    // Determina qué datasets están visibles
    const visibleDatasets = datasets.filter((dataset) => !dataset.hidden);

    // Configura el rango basado en los datasets visibles
    if (visibleDatasets.length === 1) {
      const datasetIndex = datasets.indexOf(visibleDatasets[0]);
      if (datasetIndex === 0) {
        // Solo Temperature está visible
        chart.options!.scales!["y"] = {
          ...chart.options!.scales!["y"],
          max: 30,
          min: 20,
        };
      } else if (datasetIndex === 1) {
        // Solo Weight está visible
        chart.options!.scales!["y"] = {
          ...chart.options!.scales!["y"],
          min: 0,
          max: 50,
        };
      }
    } else {
      // Ambos datasets están visibles
      chart.options!.scales!["y"] = {
        ...chart.options!.scales!["y"],
        min: 0,
        max: 50,
      };
    }
  }
}
