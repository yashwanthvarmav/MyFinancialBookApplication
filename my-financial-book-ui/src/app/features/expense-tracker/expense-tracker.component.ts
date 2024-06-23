import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { Component } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';

interface ExpenseEntry {
  date: Date;
  category: string;
  amount: number;
  description: string;
}

@Component({
  selector: 'app-expense-tracker',
  standalone: true,
  imports: [
    NzDatePickerModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzCardModule,
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    FormsModule,
    NzInputModule,
    NzSelectModule,
    CommonModule,
  ],
  templateUrl: './expense-tracker.component.html',
  styleUrl: './expense-tracker.component.scss',
})
export class ExpenseTrackerComponent {
  expenseForm: FormGroup;
  expenseEntries: ExpenseEntry[] = [
    { date: new Date(), category: 'Food', amount: 50, description: 'Lunch' },
    {
      date: new Date(),
      category: 'Transport',
      amount: 20,
      description: 'Bus fare',
    },
  ];
  isModalVisible = false;
  isEditing = false;
  editingIndex: number | null = null;

  constructor(private fb: FormBuilder, private modalService: NzModalService) {
    this.expenseForm = this.fb.group({
      date: [null, [Validators.required]],
      category: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  showModal(): void {
    this.isModalVisible = true;
  }

  handleOk(): void {
    if (this.expenseForm.valid) {
      if (this.isEditing && this.editingIndex !== null) {
        this.expenseEntries[this.editingIndex] = this.expenseForm.value;
        this.isEditing = false;
        this.editingIndex = null;
      } else {
        this.expenseEntries.push(this.expenseForm.value);
      }
      this.expenseForm.reset();
      this.isModalVisible = false;
    }
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.isEditing = false;
    this.editingIndex = null;
    this.expenseForm.reset();
  }

  editEntry(entry: ExpenseEntry): void {
    this.expenseForm.setValue({
      date: entry.date,
      category: entry.category,
      amount: entry.amount,
      description: entry.description,
    });
    this.isModalVisible = true;
    this.isEditing = true;
    this.editingIndex = this.expenseEntries.indexOf(entry);
  }

  deleteEntry(entry: ExpenseEntry): void {
    this.expenseEntries = this.expenseEntries.filter((e) => e !== entry);
  }
}
