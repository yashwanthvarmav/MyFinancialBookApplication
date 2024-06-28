import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { Component } from '@angular/core';
import { format } from 'date-fns';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageServiceUser } from '../../auth/auth';
import { ToastrService } from 'ngx-toastr';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LoaderComponent } from '../../components/loader/loader.component';

interface IncomeEntry {
  source: string;
  amount: number;
  interval: string;
}

@Component({
  selector: 'app-income-tracker',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzLayoutModule,
    // NzMenuModule,
    // NzCardModule,
    NzTableModule,
    // NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    CommonModule,
    LoaderComponent,

    NzSpinModule,
  ],
  templateUrl: './income-tracker.component.html',
  styleUrl: './income-tracker.component.scss',
})
export class IncomeTrackerComponent {
  incomeForm: FormGroup;
  incomeEntries: IncomeEntry[] = [
    { source: 'Salaried', amount: 1000, interval: 'Monthly' },
    { source: 'Business', amount: 500, interval: 'Weekly' },
  ];
  isModalVisible = false;
  isEditing = false;
  editingIndex: number | null = null;
  loading = false;

  incomeData: {
    createdAt: string;
    id: number;
    name: string;
    updatedAt: string;
    Title: string;
    SubCategory: any;
    Category: any;
    description: string;
    amount: any;
    date: string;
  }[] = [];

  categories: {
    createdAt: string;
    id: number;
    name: string;
    updatedAt: string;
  }[] = [];

  subCategory: {
    categoryId: number;
    createdAt: string;
    id: number;
    name: string;
    updatedAt: string;
  }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private modalService: NzModalService,
    private userStorage: StorageServiceUser,
    private toastr: ToastrService
  ) {
    this.incomeForm = this.fb.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      subcategory: ['', [Validators.required]],
      description: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
    });
  }

  onCategoryChange(event: any) {
    const selectedCategoryId = event.target.value;

    const values = this.incomeForm.value;
    if (selectedCategoryId) {
      this.incomeForm.setValue({
        ...values,
        subcategory: '',
      });
      this.fetchCategoryDetails(selectedCategoryId);
    }
  }

  fetchIncomeData() {
    this.loading = true;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .get(`http://localhost:3000/getIncomeExpense?categoryType=Income`, {
        headers,
      })
      .subscribe(
        (data: any) => {
          // this.lineItems = data;
          console.log('Selected category data:', data);
          this.incomeData = data.response;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching category details:', error);
          this.loading = false;
        }
      );
  }

  formatDate(date: string, formatString: string = 'dd/MM/yyyy'): string {
    return format(new Date(date), formatString);
  }

  fetchCategoryDetails(categoryId: number) {
    this.loading = true;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .get(`http://localhost:3000/subCategories?categoryId=${categoryId}`, {
        headers,
      })
      .subscribe(
        (data: any) => {
          this.subCategory = data;
          console.log('Selected category data:', this.subCategory);
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching category details:', error);
          this.loading = false;
        }
      );
  }

  handleCategories() {
    this.loading = true;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .get(`http://localhost:3000/categories?categoryType=Income`, { headers })
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.categories = data;
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        },
      });
  }

  deleteIncome(id: number) {
    this.loading = true;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .delete(`http://localhost:3000/deleteIncomeExpense/Income/${id}`, {
        headers,
      })
      .subscribe(
        (data: any) => {
          // this.subCategory = data;
          this.fetchIncomeData();
          console.log('Selected category data:', this.subCategory);
          this.toastr.success(data?.message, 'Success');
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching category details:', error);
          this.loading = false;
          this.userStorage.handleErrors(error);
        }
      );
  }

  ngOnInit() {
    this.handleCategories();
    this.fetchIncomeData();
  }

  showModal(): void {
    this.isModalVisible = true;
  }

  handleOk(): void {
    if (this.incomeForm.valid) {
      if (this.isEditing && this.editingIndex !== null) {
        this.incomeEntries[this.editingIndex] = this.incomeForm.value;
        this.isEditing = false;
        this.editingIndex = null;
      } else {
        this.incomeEntries.push(this.incomeForm.value);
      }
      this.incomeForm.reset();
      this.isModalVisible = false;
    }
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.isEditing = false;
    this.editingIndex = null;
    this.incomeForm.reset();
  }

  editEntry(entry: any): void {
    this.fetchCategoryDetails(entry.Category.id);
    this.incomeForm.setValue({
      amount: entry.amount,
      title: entry.Title,
      category: entry.Category.id,
      subcategory: entry.SubCategory.id,
      description: entry.description,
      date: new Date(entry.date).toISOString().split('T')[0],
    });
    this.isModalVisible = true;
    this.isEditing = entry.id;
    this.editingIndex = this.incomeEntries.indexOf(entry);
  }

  deleteEntry(entry: any): void {
    console.log('delete->', entry);

    this.modalService.confirm({
      nzTitle: 'Confirm Delete',
      nzContent: 'Are you sure you want to delete this income entry?',
      nzOkText: 'Yes',
      // nzOkType: 'danger',
      nzOnOk: () => {
        this.deleteIncome(entry.id);
      },
      nzCancelText: 'No',
    });
  }

  addService() {
    this.loading = true;
    const values = this.incomeForm.value;
    const userData = this.userStorage.getCurrentUser();
    const data = {
      categoryType: 'Income',
      Title: values.title,
      subCategoryId: values.subcategory,
      description: values.description,
      amount: values.amount,
      date: values.date,
    };
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .post('http://localhost:3000/addIncomeExpense', data, { headers })
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.fetchIncomeData();
          this.toastr.success(data?.message, 'Success');
          this.loading = false;
          this.handleCancel();
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
          this.userStorage.handleErrors(err);
        },
      });
  }

  editIncome() {
    this.loading = true;
    const values = this.incomeForm.value;
    const data = {
      categoryType: 'Income',
      Title: values.title,
      subCategoryId: values.subcategory,
      description: values.description,
      amount: values.amount,
      date: values.date,
    };
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .put(
        `http://localhost:3000/updateIncomeExpense/${this.isEditing}`,
        data,
        {
          headers,
        }
      )
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.fetchIncomeData();
          this.toastr.success(data?.message, 'Success');
          this.loading = false;
          this.handleCancel();
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
          this.userStorage.handleErrors(err);
        },
      });
  }

  submitForm() {
    if (this.incomeForm.valid) {
      if (this.isEditing) {
        console.log('first//->', this.incomeForm);
        this.editIncome();
      } else {
        this.addService();
      }
    }
    console.log('first->', this.incomeForm);
  }
}
