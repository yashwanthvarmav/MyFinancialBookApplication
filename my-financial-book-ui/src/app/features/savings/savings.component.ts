import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';

interface SavingEntry {
  date: Date;
  amount: number;
  description: string;
}

@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzLayoutModule,
    // NzMenuModule,
    // NzCardModule,
    NzTableModule,
    // NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    CommonModule,
  ],
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.scss',
})
export class SavingsComponent {
  savingForm: FormGroup;
  savingEntries: SavingEntry[] = [
    { date: new Date(), amount: 50, description: 'Lunch' },
    {
      date: new Date(),

      amount: 20,
      description: 'Bus fare',
    },
  ];
  isModalVisible = false;
  isEditing = false;
  editingIndex: number | null = null;

  constructor(private fb: FormBuilder, private modalService: NzModalService) {
    this.savingForm = this.fb.group({
      date: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  showModal(): void {
    this.isModalVisible = true;
  }

  handleOk(): void {
    if (this.savingForm.valid) {
      if (this.isEditing && this.editingIndex !== null) {
        this.savingEntries[this.editingIndex] = this.savingForm.value;
        this.isEditing = false;
        this.editingIndex = null;
      } else {
        this.savingEntries.push(this.savingForm.value);
      }
      this.savingForm.reset();
      this.isModalVisible = false;
    }
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.isEditing = false;
    this.editingIndex = null;
    this.savingForm.reset();
  }

  editEntry(entry: SavingEntry): void {
    this.savingForm.setValue({
      date: entry.date,
      amount: entry.amount,
      description: entry.description,
    });
    this.isModalVisible = true;
    this.isEditing = true;
    this.editingIndex = this.savingEntries.indexOf(entry);
  }

  deleteEntry(entry: SavingEntry): void {
    this.modalService.confirm({
      nzTitle: 'Confirm Delete',
      nzContent: 'Are you sure you want to delete this saving entry?',
      nzOkText: 'Yes',
      // nzOkType: 'danger',
      nzOnOk: () => {
        this.savingEntries = this.savingEntries.filter((e) => e !== entry);
      },
      nzCancelText: 'No',
    });
  }
}
