import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const TOKEN = 'auth_token';
const USER = 'l_user';

@Injectable({ providedIn: 'root' })
export class StorageServiceUser {
  constructor(private toastr: ToastrService) {}

  public saveTokenValue(token: string) {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public getTokenValue() {
    return window.localStorage.getItem(TOKEN);
  }

  public saveCurrentUser(user: any) {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  public getCurrentUser() {
    const user = window.localStorage.getItem(USER);
    if (user) return JSON.parse(user);
    return null;
  }

  public isUserLoggedIn() {
    const userDetails = window.localStorage.getItem(USER);
    if (userDetails) {
      const data = JSON.parse(userDetails);
      return data.role;
    }
    return 'User';
  }

  public logOut() {
    window.localStorage.removeItem(USER);
    window.localStorage.removeItem(TOKEN);
  }

  public handleErrors(error: any, customMsg?: any) {
    if (customMsg) {
      this.toastr.error(customMsg, 'Error');
    } else {
      const msg =
        error?.error?.message || error?.error?.error || error?.message;
      this.toastr.error(msg, 'Error');
    }
  }
}
