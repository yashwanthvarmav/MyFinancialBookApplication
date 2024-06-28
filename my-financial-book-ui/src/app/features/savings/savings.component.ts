import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { StorageServiceUser } from '../../auth/auth';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';
import { LoaderComponent } from '../../components/loader/loader.component';

interface SavingEntry {
  date: Date;
  amount: number;
  description: string;
}

@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzLayoutModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    CommonModule,
    LoaderComponent,
  ],
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.scss',
})
export class SavingsComponent {
  savingForm: FormGroup;
  savingEntries: SavingEntry[] = [
    { date: new Date(), amount: 50, description: 'Lunch' },
    {
      date: new Date(),

      amount: 20,
      description: 'Bus fare',
    },
  ];
  isModalVisible = false;
  isEditing = false;
  editingIndex: number | null = null;
  loading = false;

  savingsData: {
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
    userId: any;
    investmentStartedDate: string;
    lockInPeriod: string;
    dateOfMaturity: string;
    maturityAmount: string;
    nextPaymentDate: string;
  }[] = [];

  // Title: Joi.string().required(),
  // subCategoryId: Joi.number().required(),
  // description: Joi.string(),
  // amount: Joi.number().required(),
  // investmentStartedDate: Joi.date(),
  // lockInPeriod: Joi.string().regex(/^\d+(\.\d{1,2})?$/),
  // dateOfMaturity: Joi.date(),
  // maturityAmount: Joi.number(),
  // nextPaymentDate: Joi.date()

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
    private modalService: NzModalService,
    private http: HttpClient,
    private userStorage: StorageServiceUser,
    private toastr: ToastrService
  ) {
    this.savingForm = this.fb.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      subcategory: ['', [Validators.required]],
      description: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      investmentStartedDate: [null, [Validators.required]],
      lockInPeriod: [null, [Validators.required]],
      dateOfMaturity: [null, [Validators.required]],
      maturityAmount: [null, [Validators.required]],
      nextPaymentDate: [null, [Validators.required]],
    });
  }

  onCategoryChange(event: any) {
    const selectedCategoryId = event.target.value;

    const values = this.savingForm.value;
    if (selectedCategoryId) {
      this.savingForm.setValue({
        ...values,
        subcategory: '',
      });
      this.fetchCategoryDetails(selectedCategoryId);
    }
  }

  formatDate(date: string, formatString: string = 'dd/MM/yyyy'): string {
    return format(new Date(date), formatString);
  }

  fetchSavingsData() {
    this.loading = true;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .get(`http://localhost:3000/getSavingsInvestments`, {
        headers,
        params: {},
      })
      .subscribe(
        (data: any) => {
          // this.lineItems = data;
          console.log('Selected category data:', data);
          this.savingsData = data.result;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching category details:', error);
          this.loading = false;
        }
      );
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
      .get(
        `http://localhost:3000/categories?categoryType=SavingsAndInvestments`,
        { headers }
      )
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

  deleteSavings(id?: number) {
    this.loading = true;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .delete(`http://localhost:3000/deleteSavingsInvestments/${id}`, {
        headers,
      })
      .subscribe(
        (data: any) => {
          // this.subCategory = data;
          this.fetchSavingsData();
          console.log('Selected category data:', this.subCategory);
          this.toastr.success(data?.message, 'Success');
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching category details:', error);
          this.loading = false;
        }
      );
  }

  ngOnInit() {
    this.handleCategories();
    this.fetchSavingsData();
  }

  showModal(): void {
    this.isModalVisible = true;
  }

  handleOk(): void {
    if (this.savingForm.valid) {
      if (this.isEditing && this.editingIndex !== null) {
        this.savingEntries[this.editingIndex] = this.savingForm.value;
        this.isEditing = false;
        this.editingIndex = null;
      } else {
        this.savingEntries.push(this.savingForm.value);
      }
      this.savingForm.reset();
      this.isModalVisible = false;
    }
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.isEditing = false;
    this.editingIndex = null;
    this.savingForm.reset();
  }

  editEntry(entry: any): void {
    this.fetchCategoryDetails(entry.Category.id);
    this.savingForm.setValue({
      amount: entry.amount,
      title: entry.Title,
      category: entry.Category.id,
      subcategory: entry.SubCategory.id,
      description: entry.description,
      investmentStartedDate: new Date(entry.investmentStartedDate)
        .toISOString()
        .split('T')[0],
      lockInPeriod: entry.lockInPeriod,
      dateOfMaturity: new Date(entry.dateOfMaturity)
        .toISOString()
        .split('T')[0],
      maturityAmount: entry.maturityAmount,
      nextPaymentDate: new Date(entry.nextPaymentDate)
        .toISOString()
        .split('T')[0],
    });
    this.isModalVisible = true;
    this.isEditing = entry.id;
    this.editingIndex = this.savingEntries.indexOf(entry);
  }

  deleteEntry(entry: any): void {
    this.modalService.confirm({
      nzTitle: 'Confirm Delete',
      nzContent: 'Are you sure you want to delete this saving entry?',
      nzOkText: 'Yes',
      // nzOkType: 'danger',
      nzOnOk: () => {
        this.deleteSavings(entry?.id);
      },
      nzCancelText: 'No',
    });
  }

  addSavings() {
    this.loading = true;
    const values = this.savingForm.value;
    const data = {
      Title: values.title,
      subCategoryId: values.subcategory,
      description: values.description,
      amount: values.amount,
      investmentStartedDate: values.investmentStartedDate,
      lockInPeriod: values.lockInPeriod,
      dateOfMaturity: values.dateOfMaturity,
      maturityAmount: values.maturityAmount,
      nextPaymentDate: values.nextPaymentDate,
    };
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .post('http://localhost:3000/addSavingsInvestments', data, { headers })
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.fetchSavingsData();
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
    const values = this.savingForm.value;
    const data = {
      Title: values.title,
      subCategoryId: values.subcategory,
      description: values.description,
      maturityAmount: values.maturityAmount,
      amount: values.amount,
      investmentStartedDate: values.investmentStartedDate,
      lockInPeriod: values.lockInPeriod,
      nextPaymentDate: values.nextPaymentDate,
      dateOfMaturity: values.dateOfMaturity,
    };
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .put(
        `http://localhost:3000/updateSavingsInvestments/${this.isEditing}`,
        data,
        {
          headers,
        }
      )
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.fetchSavingsData();
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
    if (this.savingForm.valid) {
      if (this.isEditing) {
        console.log('first//->', this.savingForm);
        this.editIncome();
      } else {
        this.addSavings();
      }
    }
    console.log('first->', this.savingForm);
  }
}
