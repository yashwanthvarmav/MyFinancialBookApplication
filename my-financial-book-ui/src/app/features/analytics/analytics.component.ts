import { Component, ViewChild } from '@angular/core';
// import { NgModule } from '@angular/core';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageServiceUser } from '../../auth/auth';
import { ToastrService } from 'ngx-toastr';

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
  selector: 'app-analytics',
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
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AnalyticsComponent {
  // @ViewChild('chart') chart: ChartComponent;
  chartOptions: any = {
    series: [
      {
        name: 'Savings ',
        data: [0],
      },
      {
        name: 'Income',
        data: [0],
      },
      {
        name: 'Expenses',
        data: [0],
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

  loading = false;
  piechartOptions: any = {
    series: [1],
    chart: {
      type: 'donut',
    },
    labels: ['No Data Available'],
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
  role: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userStorage: StorageServiceUser,
    private toastr: ToastrService
  ) {
    this.role = !!(this.userStorage.getCurrentUser().role === 'Admin');

    console.log('hello', this.role);
  }

  totalIncome = 0;
  totalExpenses = 0;
  totalSavings = 0;
  incomePercent = 0;
  expensePercent = 0;
  savingsPercent = 0;

  getMonthName = (date: any) => {
    return date.toLocaleString('default', { month: 'long' });
  };

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

  // Function to generate the last six months
  generateLastSixMonths = () => {
    const months = [];
    const date = new Date();

    for (let i = 0; i < 6; i++) {
      months.unshift(
        this.getMonthName(new Date(date.getFullYear(), date.getMonth() - i, 1))
      );
    }

    return months;
  };

  handlePercentage = (
    totalIncome: any,
    totalExpenses: any,
    totalSavings: any
  ) => {
    const incomePercent =
      (totalIncome / (totalIncome + totalExpenses + totalSavings)) * 100;
    const expensePercent =
      (totalExpenses / (totalIncome + totalExpenses + totalSavings)) * 100;
    const savingsPercent =
      (totalSavings / (totalIncome + totalExpenses + totalSavings)) * 100;

    return { incomePercent, expensePercent, savingsPercent };
  };

  handleValues = (data: any) => {
    const lastSixMonths = this.generateLastSixMonths();
    const savingsData: any[] = [];
    const incomeData: any[] = [];
    const expenseData: any[] = [];

    console.log('list->', lastSixMonths);

    lastSixMonths.forEach((month) => {
      incomeData.push(data[month]?.income || 0);
      savingsData.push(data[month]?.savingInvestment || 0);
      expenseData.push(data[month]?.expense || 0);
    });

    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          name: 'Savings ',
          data: savingsData,
        },
        {
          name: 'Income',
          data: incomeData,
        },
        {
          name: 'Expenses',
          data: expenseData,
        },
      ],
      xaxis: {
        categories: lastSixMonths,
      },
    };

    console.log('data->', incomeData, savingsData, expenseData);

    // investmentsPercent =
    //   (this.totalInvestments /
    //     (this.totalIncome +
    //       this.totalExpenses +
    //       this.totalSavings +
    //       this.totalInvestments)) *
    //   100;
  };

  fetchExpenseData() {
    this.loading = true;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .get(`http://localhost:3000/lastSixMonths`, {
        headers,
      })
      .subscribe(
        (data: any) => {
          console.log('Selected category data:', data);
          this.handleValues(data);
          // this.expenseData = data.response;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching category details:', error);
          this.loading = false;
        }
      );
  }

  getCategoriesData() {
    this.loading = true;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .get(`http://localhost:3000/getDataCategoriesWise`, {
        headers,
      })
      .subscribe(
        (data: any) => {
          const seriesData: any[] = [];
          const labelsData: any[] = [];
          console.log('category:', seriesData, labelsData, data);
          const newdata = Object?.values(data) || [];
          newdata?.forEach((item: any) => {
            seriesData.push(item?.totalAmount);
            labelsData.push(item?.categoryName);
          });
          console.log('category:', seriesData, labelsData, data);
          if (seriesData?.length && labelsData?.length) {
            this.piechartOptions = {
              ...this.piechartOptions,
              series: seriesData,
              labels: labelsData,
            };
          }
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching category details:', error);
          this.loading = false;
        }
      );
  }

  formatOne = (percent: number): string => `${this.expensePercent} %`;
  formatTwo = (): string => `${this.savingsPercent} %`;

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
          this.expensePercent = Math.floor(
            (data.expenseSum / data.incomeSum) * 100
          );
          this.savingsPercent = Math.floor(
            (data.savingsSum / data.incomeSum) * 100
          );

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
    this.getCategoriesData();
    this.getTotalSumData();
    this.getCurrenyData();
  }
}
