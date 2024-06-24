import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { StorageServiceUser } from '../../auth/auth';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    NzLayoutModule,
    LoaderComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  userForm: FormGroup;
  loading = false;
  editing = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userStorage: StorageServiceUser,
    private toastr: ToastrService
  ) {
    this.userForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      dateOfBirth: [''],
      address: [''],
      country: [''],
      pinCode: [''],
    });
  }

  fetchProfileData() {
    this.loading = true;
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .get(`http://localhost:3000/profile`, {
        headers,
      })
      .subscribe(
        (data: any) => {
          // this.lineItems = data;
          console.log('Selected category data:', data);
          this.userForm.setValue({
            userName: data.userName || '',
            email: data.email || '',
            phoneNumber: data.phoneNumber || '',
            dateOfBirth: data?.dateOfBirth
              ? new Date(data.dateOfBirth).toISOString().split('T')[0]
              : '',
            address: data.address || '',
            country: data.country || '',
            pinCode: data.pinCode || '',
          });
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching category details:', error);
          this.loading = false;
        }
      );
  }

  editProfileData() {
    this.loading = true;
    const values = this.userForm.value;
    const data = {
      ...values,
    };
    const headers = new HttpHeaders().set(
      'Authorization',
      `${window.localStorage.getItem('auth_token')}`
    );
    this.http
      .put(`http://localhost:3000/profile`, data, {
        headers,
      })
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.fetchProfileData();
          this.toastr.success(data?.message, 'Success');
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
          this.userStorage.handleErrors(err);
        },
      });
  }

  ngOnInit(): void {
    this.fetchProfileData();
  }

  editProfile(): void {
    this.editing = true;
    this.editProfile();
  }

  saveProfile(): void {
    console.log('first');
    this.editing = false;
    this.editProfileData();
  }

  cancelEdit(): void {
    this.editing = false;
  }
}
