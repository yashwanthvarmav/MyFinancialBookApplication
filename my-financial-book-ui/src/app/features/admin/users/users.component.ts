import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { StorageServiceUser } from '../../../auth/auth';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
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
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'app-users',
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
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users: {
    createdAt: string;
    id: number;
    updatedAt: string;
    address: string;
    country: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    pinCode: any;
    role: string;
    userName: string;
  }[] = [];
  loading = false;

  constructor(
    private http: HttpClient,
    private userStorage: StorageServiceUser,
    private toastr: ToastrService
  ) {}

  fetchUsersData() {
    this.loading = true;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .get(`http://localhost:3000/users`, {
        headers,
      })
      .subscribe(
        (data: any) => {
          console.log('Selected category data:', data);
          this.users = data;
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
  ngOnInit() {
    this.fetchUsersData();
  }

  deleteEntry(entry: any): void {
    // this.modalService.confirm({
    //   nzTitle: 'Confirm Delete',
    //   nzContent: 'Are you sure you want to delete this expense entry?',
    //   nzOkText: 'Yes',
    //   // nzOkType: 'danger',
    //   nzOnOk: () => {
    //     this.deleteIncome(entry.id);
    //   },
    //   nzCancelText: 'No',
    // });
  }
}
