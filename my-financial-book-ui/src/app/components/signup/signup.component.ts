import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageServiceUser } from '../../auth/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signUpForm: FormGroup;
  httpClient = inject(HttpClient);
  data: Array<any> = [];
  dynamicClass = 'disable-button';
  loader = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private userStorage: StorageServiceUser
  ) {
    const authT = window.localStorage.getItem('auth_token');
    if (authT) {
      this.router.navigateByUrl('/dashboard');
    }
    this.signUpForm = this.fb.group(
      {
        name: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validator: this.passwordMatchValidator }
    );

    this.signUpForm.valueChanges.subscribe(() => {
      console.log('is->', this.signUpForm.valid);
      if (this.signUpForm.valid) {
        this.dynamicClass = '';
      } else {
        this.dynamicClass = 'disable-button';
      }
    });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  submitForm() {
    const isVaild = this.signUpForm.valid;
    console.log('is->', this.signUpForm);
    const values = this.signUpForm.value;
    if (isVaild) {
      const data = {
        userName: values?.name,
        email: values?.email,
        password: values?.password,
        confirmPassword: values?.confirmPassword,
      };
      this.loader = true;
      this.http.post('http://localhost:3000/register', data).subscribe({
        next: (data: any) => {
          console.log(data);
          this.toastr.success(data?.message, 'Success');
          this.loader = false;
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          this.loader = false;
          this.userStorage.handleErrors(err);
        },
      });
    }
  }
}
