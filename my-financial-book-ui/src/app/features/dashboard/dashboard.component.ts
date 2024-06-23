import { NzProgressModule } from 'ng-zorro-antd/progress';
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexXAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate, style, transition, trigger } from '@angular/animations';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NzProgressModule,
    NzCardModule,
    NzGridModule,
    NzTableModule,
    NzLayoutModule,
    // BrowserAnimationsModule,
    NzStatisticModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class DashboardComponent {
  // Table data
  listOfData = [
    { date: '2024-06-20', description: 'Grocery Shopping', amount: '$50' },
    { date: '2024-06-21', description: 'Electricity Bill', amount: '$30' },
    { date: '2024-06-22', description: 'Dinner', amount: '$70' },
    { date: '2024-06-23', description: 'Subscription', amount: '$15' },
  ];

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
