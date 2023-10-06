import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Chart, ChartOptions, ChartTypeRegistry } from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  @Input() chartType: keyof ChartTypeRegistry = 'bar';
  @Input() chartData: any;

  constructor() { }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    if (this.chartData) {
      const dataLabels = Object.keys(this.chartData.estadisticas);
      
      const labels = dataLabels.map(key => this.chartData.estadisticas[key].opcion);

      const data = dataLabels.map(key => this.chartData.estadisticas[key].porcentaje);
  

      const chartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
              display: false
          }
        }
      };

      const chartData = {
        labels: labels,
        datasets: [{
          label: 'Porcentaje',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.4)',
            'rgba(255, 159, 64, 0.4)',
            'rgba(75, 192, 192, 0.4)',
            'rgba(153, 102, 255, 0.4)',
            'rgba(54, 162, 235, 0.4)',
            'rgba(201, 203, 207, 0.4)',
            'rgba(255, 205, 86, 0.4)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      };

      const ctx = this.chartCanvas.nativeElement.getContext('2d');
      new Chart(ctx, {
        type: this.chartType,
        data: chartData,
        options: chartOptions
      });
    }
  }
}