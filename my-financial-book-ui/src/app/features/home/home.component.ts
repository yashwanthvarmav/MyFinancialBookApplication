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

  constructor(private router: Router) {}
  navigateToProfile() {
    this.router.navigateByUrl('/profile');
  }
  logout() {
    // this.userStorage.logOut();
    this.router.navigateByUrl('/login');
  }

  toggleSidebar() {
    this.isActive = !this.isActive;
  }
  setActive(item: string) {
    this.activeItem = item;
  }
}
