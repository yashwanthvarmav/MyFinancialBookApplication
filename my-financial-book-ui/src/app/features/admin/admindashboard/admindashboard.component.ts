import { Component, ViewChild } from '@angular/core';
// import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [
    CommonModule,
    NzProgressModule,
    NzCardModule,
    NzGridModule,
    NzLayoutModule,
    NzStatisticModule,

    NgApexchartsModule,
  ],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AdmindashboardComponent {
  chartOptions: any = {
    series: [
      {
        name: 'Savings ',
        data: [13, 23, 20, 8, 13, 27],
        // color: 'rgb(0, 143, 251)',
      },
      {
        name: 'Income',
        data: [44, 55, 41, 67, 22, 43],
        // color: 'rgb(63, 134, 0)',
      },

      {
        name: 'Investments',
        data: [11, 17, 15, 15, 21, 14],
        // color: 'rgb(127, 83, 172)',
      },
      {
        name: 'Expenses',
        data: [44, 55, 41, 67, 22, 43],
        // color: 'rgb(255, 69, 96)',
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      stackType: '100%',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'right',
      offsetX: 0,
      offsetY: 50,
    },
  };

  piechartOptions: any = {
    series: [44, 55, 13, 43, 22],
    chart: {
      type: 'donut',
    },
    labels: ['Rent', 'Groceries', 'Personal', 'Shopping', 'Maintanance'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  constructor() {}

  totalIncome = 5000;
  totalExpenses = 3000;
  totalSavings = 1500;
  totalInvestments = 500;

  incomePercent =
    (this.totalIncome /
      (this.totalIncome +
        this.totalExpenses +
        this.totalSavings +
        this.totalInvestments)) *
    100;
  expensePercent =
    (this.totalExpenses /
      (this.totalIncome +
        this.totalExpenses +
        this.totalSavings +
        this.totalInvestments)) *
    100;
  savingsPercent =
    (this.totalSavings /
      (this.totalIncome +
        this.totalExpenses +
        this.totalSavings +
        this.totalInvestments)) *
    100;
  investmentsPercent =
    (this.totalInvestments /
      (this.totalIncome +
        this.totalExpenses +
        this.totalSavings +
        this.totalInvestments)) *
    100;
}
