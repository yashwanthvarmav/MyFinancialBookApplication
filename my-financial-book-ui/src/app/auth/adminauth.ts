import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageServiceUser } from './auth';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: StorageServiceUser,
    private router: Router
  ) {}

  canActivate(): boolean {
    const auth = window.localStorage.getItem('auth_token');
    if (
      this.authService.isUserLoggedIn() &&
      this.authService.isUserLoggedIn() === 'Admin' &&
      auth
    ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
