import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './features/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { IncomeTrackerComponent } from './features/income-tracker/income-tracker.component';
import { ExpenseTrackerComponent } from './features/expense-tracker/expense-tracker.component';
import { SavingsComponent } from './features/savings/savings.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { ProfileComponent } from './features/profile/profile.component';
import { AdminGuard } from './auth/adminauth';
import { AdminhomeComponent } from './features/admin/adminhome/adminhome.component';
import { UserGuard } from './auth/userauth';
import { AdmindashboardComponent } from './features/admin/admindashboard/admindashboard.component';
import { UsersComponent } from './features/admin/users/users.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: HomeComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full',
      },
      {
        path: 'income-tracker',
        component: IncomeTrackerComponent,
      },
      {
        path: 'expense-tracker',
        component: ExpenseTrackerComponent,
      },
      {
        path: 'savings-tracker',
        component: SavingsComponent,
      },
      {
        path: 'analytics',
        component: AnalyticsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      { path: '**', redirectTo: '/dashboard' },
    ],
  },
  {
    path: 'admindashboard',
    component: AdminhomeComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: AnalyticsComponent,
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: UsersComponent,
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      { path: '**', redirectTo: '/admindashboard' },
    ],
  },
];
