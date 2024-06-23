import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, NzLayoutModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user = {
    // Replace with your actual user data
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30,
  };

  editing = false;

  constructor() {}

  ngOnInit(): void {}

  editProfile(): void {
    this.editing = true;
  }

  saveProfile(): void {
    // Here you would typically call a service to save the updated user data
    console.log('Saving profile:', this.user);
    this.editing = false;
  }

  cancelEdit(): void {
    this.editing = false;
    // Optionally, reset form fields if needed
  }
}
