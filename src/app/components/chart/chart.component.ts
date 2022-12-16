import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnChanges {
  @ViewChild('barChart') barChart: any;
  @Input() type: ChartType = 'bar';
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() backgroundColor = 'rgb(255,0,0)';
  @Input() title = '';
  bars: any;
  colorArray: any;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.labels.currentValue.length) {
      this.updateChart();
    }
  }

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
    const config = this.getChart();
    this.bars = new Chart(this.barChart.nativeElement, config);
  }

  getChart(): any {
    if (this.type === 'doughnut') {
      return this.chartDoughnut();
    } else {
      return this.createChartOthers();
    }
  }

  updateChart(): void {
    this.bars.data.labels = this.labels;
    this.bars.data.datasets[0].data = this.data;
    this.bars.update();
  }

  createChartOthers(): any {
    const datasets = [
      {
        data: this.data,
        backgroundColor: this.backgroundColor,
        borderColor: 'rgb(255,0,0)',
        borderWidth: 1,
        label: 'SSSSSSSSSS',
      },
    ];

    return {
      type: this.type,
      data: {
        labels: this.labels,
        datasets,
      },
      options: {
        plugins: plugins(this.title),
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
    };
  }

  chartDoughnut(): any {
    const data = {
      labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
      datasets: [
        {
          label: 'SSSSSSSSSS',
          data: this.data,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
        },
      ],
    };
    return {
      type: 'doughnut',
      data,
      options: {
        responsive: true,
        plugins: plugins(this.title),
      },
    };
  }
}

export const plugins = (title: string, useLegend = false) => ({
  legend: {
    position: 'top',
  },
  title: {
    display: true,
    text: title,
  },
});
