import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  CreateTransactionsPayload,
  TransactionsService,
} from '@shared/services/transactions.service';
import { Transaction } from '@shared/types/transaction';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-transactions-dialog',
  templateUrl: './create-transactions-dialog.component.html',
  styleUrls: ['./create-transactions-dialog.component.scss'],
})
export class CreateTransactionsDialogComponent {
  transactionInput: string = '';
  isCreateFormValid: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<CreateTransactionsDialogComponent>,
    private transactionsService: TransactionsService,
    private snackBar: MatSnackBar,
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  private isValidLine(line: string): boolean {
    return line.trim().length > 0 && line.includes(',');
  }

  private parseTransaction(line: string): Transaction | Error {
    const data = line.split(',');
    if (data.length !== 3) return new Error('Invalid Format');

    const [date, valueStr, category] = data.map((item) => item.trim());
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return new Error('Invalid Date Format');

    const value = parseFloat(valueStr);
    if (isNaN(value)) return new Error('Value must be a number');
    if (value === 0) return new Error('Transaction value cannot be zero');

    const dateWithoutTime = parsedDate.toISOString().split('T')[0];
    return { date: dateWithoutTime, value, category };
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  onSaveClick(): void {
    this.isCreateFormValid = true;
    const lines = this.transactionInput.split('\n').filter((line) => !!line);

    if (lines.every((line) => !this.isValidLine(line))) {
      this.showSnackBar('Invalid or empty transaction!');
      this.isCreateFormValid = false;
      return;
    }

    const transactions: Transaction[] = [];
    const error: string[] = [];

    lines.forEach((line) => {
      if (!this.isValidLine(line)) return;
      const result = this.parseTransaction(line);
      if (result instanceof Error) {
        error.push(result.message);
      } else {
        transactions.push(result);
      }
    });

    if (error.length > 0) {
      this.showSnackBar(`Error: ${error.join(', ')}`);
      this.isCreateFormValid = false;
      return;
    }

    const payload: CreateTransactionsPayload = { transactions };
    this.transactionsService.createTransactions(payload).subscribe({
      next: () => {
        this.showSnackBar('Transaction created successfully!');
        this.dialogRef.close(payload);
      },
      error: (err) => {
        this.showSnackBar(`Error: ${err.message}`);
        this.isCreateFormValid = false;
      },
    });
  }
}
