import { NgxLoadingModule } from 'ngx-loading';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StorageServiceUser } from '../../auth/auth';
import { LoaderComponent } from '../loader/loader.component';
// import { LoaderComponent } from '../../common/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    // LoaderComponent,
    NgxLoadingModule,
    LoaderComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  httpClient = inject(HttpClient);
  data: Array<any> = [];
  loading = false;
  dynamicClass = 'disable-button';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private userStorage: StorageServiceUser,
    private toastr: ToastrService
  ) {
    const authT = window.localStorage.getItem('auth_token');
    if (authT) {
      this.router.navigateByUrl('/dashboard');
    }
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.loginForm.valueChanges.subscribe(() => {
      console.log('->', this.loginForm);
      if (this.loginForm.valid) {
        this.dynamicClass = '';
      } else {
        this.dynamicClass = 'disable-button';
      }
    });
  }

  handleSubmit(values: any) {
    this.loading = true;
    this.http
      .post('http://localhost:3000/login', {
        email: values.userName,
        password: values.password,
      })
      .subscribe({
        next: (data: any) => {
          console.log(data);
          const { token, ...rest } = data;
          this.userStorage.saveTokenValue(data?.token);
          this.userStorage.saveCurrentUser(rest);
          this.toastr.success(data?.message, 'Success');
          if (data.role === 'Admin') {
            console.log('admin->');
            this.router.navigateByUrl('/admindashboard');
          } else this.router.navigateByUrl('/dashboard');
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
          this.userStorage.handleErrors(err);
        },
      });
  }

  submitForm() {
    const isVaild = this.loginForm.valid;
    const values = this.loginForm.value;
    console.log('values->', values);
    if (isVaild) {
      this.handleSubmit(values);
    }
  }
}
