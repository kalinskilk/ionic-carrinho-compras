import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @ViewChild('barChart') barChart: any;

  bars: any;
  colorArray: any;

  ionViewDidEnter() {
    window.setTimeout(() => {
      this.createBarChart();
    }, 200);
  }

  ngOnInit(): void {
    window.setTimeout(() => {
      this.createBarChart();
    }, 200);
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['01/12', '02/12', '03/12', '04/12', '12/12', '13/12'],
        datasets: [
          {
            data: [159.99, 300, 200, 125.87, 58, 65],
            backgroundColor: 'rgb(131, 10, 209)',
            borderColor: 'rgb(131, 10, 209)',
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
            grid: {
              offset: true,
              lineWidth: 0,
            },
          },
          x: {
            grid: {
              offset: true,
              lineWidth: 0,
            },
          },
          gridLines: {
            display: false,
          },
        },
      },
    });
  }
}
