import { NzProgressModule } from 'ng-zorro-antd/progress';
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { format } from 'date-fns';
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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageServiceUser } from '../../auth/auth';
import { ToastrService } from 'ngx-toastr';

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
  listOfData: {
    date: any;
    description: any;
    amount: any;
    Title: any;
    SubCategory: any;
  }[] = [];
  loading = false;

  totalIncome = 0;
  totalExpenses = 0;
  totalSavings = 0;
  incomePercent = 0;
  expensePercent = 0;
  savingsPercent = 0;

  constructor(
    private http: HttpClient,
    private userStorage: StorageServiceUser,
    private toastr: ToastrService
  ) {}

  formatDate(date: string, formatString: string = 'dd/MM/yyyy'): string {
    return format(new Date(date), formatString);
  }

  fetchExpenseData() {
    this.loading = true;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .get(`http://localhost:3000/topTransactions`, {
        headers,
      })
      .subscribe(
        (data: any) => {
          console.log('Selected category data:', data);
          this.listOfData = data.response;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching category details:', error);
          this.loading = false;
        }
      );
  }

  formatOne = (percent: number): string => `${this.expensePercent || 0} %`;
  formatTwo = (): string => `${this.savingsPercent || 0} %`;

  getTotalSumData() {
    this.loading = true;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .get(`http://localhost:3000/totalSum`, {
        headers,
      })
      .subscribe(
        (data: any) => {
          console.log('data->', data);
          this.totalIncome = data.incomeSum;
          this.totalExpenses = data.expenseSum;
          this.totalSavings = data.savingsSum;

          this.incomePercent = 100;
          this.expensePercent =
            Math.floor((data.expenseSum / data.incomeSum) * 100) || 0;
          this.savingsPercent =
            Math.floor((data.savingsSum / data.incomeSum) * 100) || 0;

          this.loading = false;
        },
        (error) => {
          console.error('Error fetching category details:', error);
          this.loading = false;
        }
      );
  }

  exchangeRates: any;

  getCurrenyData() {
    this.loading = true;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .get(`http://localhost:3000/exchange-rates?baseCurrency=EUR`, {
        headers,
      })
      .subscribe(
        (data: any) => {
          console.log('data->vureny->', data);
          this.exchangeRates = data.conversion_rates;

          this.loading = false;
        },
        (error) => {
          console.error('Error fetching category details:', error);
          this.loading = false;
        }
      );
  }

  ngOnInit() {
    this.fetchExpenseData();
    this.getTotalSumData();
    this.getCurrenyData();
  }
}
