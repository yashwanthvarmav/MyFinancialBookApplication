import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import {
  RouterOutlet,
  RouterModule,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StorageServiceUser } from '../../auth/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzBreadCrumbModule,
    NzDrawerModule,
    NzAvatarModule,
    NzDropDownModule,
    NzTableModule,
    RouterOutlet,
    RouterModule,
    NzDropDownModule,
    BsDropdownModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isActive: boolean = false;
  activeItem: string = 'Dashboard';
  userData = localStorage.getItem('user');
  user = this.userData ? JSON.parse(this.userData) : 'user';

  constructor(
    private router: Router,
    private userStorage: StorageServiceUser // private modalService: NzModalService
  ) {}
  navigateToProfile() {
    this.router.navigateByUrl('/profile');
  }
  logout() {
    // this.modalService.confirm({
    //   nzTitle: 'Confirm Logout',
    //   nzContent: 'Are you sure you want to logout from the application?',
    //   nzOkText: 'Yes',
    //   nzOnOk: () => {
    this.userStorage.logOut();
    this.router.navigateByUrl('/login');
    // },
    // nzCancelText: 'No',
    // });
  }

  toggleSidebar() {
    this.isActive = !this.isActive;
  }
  setActive(item: string) {
    this.activeItem = item;
  }
}
