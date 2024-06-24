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
  NavigationEnd,
} from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StorageServiceUser } from '../../../auth/auth';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-adminhome',
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
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.scss',
})
export class AdminhomeComponent {
  isActive: boolean = false;
  activeItem: string = 'dashboard';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userStorage: StorageServiceUser // private modalService: NzModalService
  ) {}
  navigateToProfile() {
    this.router.navigateByUrl('/profile');
  }
  logout() {
    this.userStorage.logOut();
    this.router.navigateByUrl('/login');
  }

  toggleSidebar() {
    this.isActive = !this.isActive;
  }
  setActive(item: string) {
    this.activeItem = item;
  }

  // ngOnInit(): void {
  //   this.router.events.subscribe(() => {
  //     const segments = this.router.url.split('/'); // ['', 'admindashboard', 'users']
  //     const usersSegment = segments[2];
  //     this.activeItem = usersSegment;
  //     console.log('user->', usersSegment, segments);
  //   });
  // }
  // console.log("roo->",this.router.url)
  // ngOnInit(): void {
  //   this.activatedRoute.url.subscribe((url: any) => console.log(url));
  //   // Set the initial URL
  //   this.activeItem = this.router.url;

  //   // Subscribe to router events to update the URL on navigation end
  //   this.router.events
  //     .pipe(filter((event: any) => event instanceof NavigationEnd))
  //     .subscribe(() => {
  //       console.log('first->', this.router.url);
  //       this.activeItem = this.router.url;
  //     });
  // }
}
