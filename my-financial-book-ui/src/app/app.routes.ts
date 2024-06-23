import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
// import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
// import { HomeComponent } from './pages/home/home/home.component';
// import { AddserviceComponent } from './pages/addservice/addservice.component';
// import { ViewserviceComponent } from './pages/viewservice/viewservice.component';
// import { ProfileComponent } from './pages/profile/profile.component';
import { UserGuard } from './auth/userauth';
import { HomeComponent } from './features/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { IncomeTrackerComponent } from './features/income-tracker/income-tracker.component';
import { ExpenseTrackerComponent } from './features/expense-tracker/expense-tracker.component';
import { SavingsComponent } from './features/savings/savings.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { ProfileComponent } from './features/profile/profile.component';

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
      // { path: 'profile', component: ProfileComponent },
      { path: '**', redirectTo: '/login' },
    ],
  },
  // {
  //   path: 'home',
  //   component: DashboardComponent,
  // },
];
