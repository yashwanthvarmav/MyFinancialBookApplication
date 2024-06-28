import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { Component } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageServiceUser } from '../../auth/auth';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';
import { LoaderComponent } from '../../components/loader/loader.component';

interface ExpenseEntry {
  date: Date;
  category: string;
  amount: number;
  description: string;
}

@Component({
  selector: 'app-expense-tracker',
  standalone: true,
  imports: [
    NzDatePickerModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzCardModule,
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    FormsModule,
    NzInputModule,
    NzSelectModule,
    CommonModule,
    LoaderComponent,
  ],
  templateUrl: './expense-tracker.component.html',
  styleUrl: './expense-tracker.component.scss',
})
export class ExpenseTrackerComponent {
  expenseForm: FormGroup;
  expenseEntries: ExpenseEntry[] = [
    { date: new Date(), category: 'Food', amount: 50, description: 'Lunch' },
    {
      date: new Date(),
      category: 'Transport',
      amount: 20,
      description: 'Bus fare',
    },
  ];
  isModalVisible = false;
  isEditing = false;
  editingIndex: number | null = null;
  loading = false;

  expenseData: {
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
    private http: HttpClient,
    private userStorage: StorageServiceUser,
    private toastr: ToastrService,
    private modalService: NzModalService
  ) {
    this.expenseForm = this.fb.group({
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
    const values = this.expenseForm.value;
    if (selectedCategoryId) {
      this.expenseForm.setValue({
        ...values,
        subcategory: '',
      });
      this.fetchCategoryDetails(selectedCategoryId);
    }
  }

  fetchExpenseData() {
    this.loading = true;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .get(`http://localhost:3000/getIncomeExpense?categoryType=Expense`, {
        headers,
      })
      .subscribe(
        (data: any) => {
          console.log('Selected category data:', data);
          this.expenseData = data.response;
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
      .get(`http://localhost:3000/categories?categoryType=Expense`, { headers })
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
      .delete(`http://localhost:3000/deleteIncomeExpense/Expense/${id}`, {
        headers,
      })
      .subscribe(
        (data: any) => {
          // this.subCategory = data;
          this.fetchExpenseData();
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
    this.fetchExpenseData();
  }

  showModal(): void {
    this.isModalVisible = true;
  }

  handleOk(): void {
    if (this.expenseForm.valid) {
      if (this.isEditing && this.editingIndex !== null) {
        this.expenseEntries[this.editingIndex] = this.expenseForm.value;
        this.isEditing = false;
        this.editingIndex = null;
      } else {
        this.expenseEntries.push(this.expenseForm.value);
      }
      this.expenseForm.reset();
      this.isModalVisible = false;
    }
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.isEditing = false;
    this.editingIndex = null;
    this.expenseForm.reset();
  }

  editEntry(entry: any): void {
    this.fetchCategoryDetails(entry.Category.id);
    this.expenseForm.setValue({
      amount: entry.amount,
      title: entry.Title,
      category: entry.Category.id,
      subcategory: entry.SubCategory.id,
      description: entry.description,
      date: new Date(entry.date).toISOString().split('T')[0],
    });
    this.isModalVisible = true;
    this.isEditing = entry.id;
    this.editingIndex = this.expenseEntries.indexOf(entry);
  }

  deleteEntry(entry: any): void {
    this.modalService.confirm({
      nzTitle: 'Confirm Delete',
      nzContent: 'Are you sure you want to delete this expense entry?',
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
    const values = this.expenseForm.value;
    const data = {
      categoryType: 'Expense',
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
          this.fetchExpenseData();
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
    const values = this.expenseForm.value;
    const data = {
      categoryType: 'Expense',
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
          this.fetchExpenseData();
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
    if (this.expenseForm.valid) {
      if (this.isEditing) {
        this.editIncome();
      } else {
        this.addService();
      }
    }
    console.log('first->', this.expenseForm);
  }
}
