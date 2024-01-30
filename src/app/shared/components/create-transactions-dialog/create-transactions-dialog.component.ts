import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {CreateTransactionsPayload, TransactionsService} from '@shared/services/transactions.service';
import {Transaction} from "@shared/types/transaction";

@Component({
  selector: 'app-create-transactions-dialog',
  templateUrl: './create-transactions-dialog.component.html',
  styleUrls: ['./create-transactions-dialog.component.scss']
})
export class CreateTransactionsDialogComponent {
  transactionInput: string = '';

  constructor(
    public dialogRef: MatDialogRef<CreateTransactionsDialogComponent>,
    private transactionsService: TransactionsService
  ) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  private parseTransaction(line: string): Transaction {
    const data = line.split(",");
    if (data.length > 3) throw new Error("Invalid Format");

    const [date, value, category] = data.map((item) => item.trim());
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) throw new Error("Invalid Date");

    const dateWithoutTime = parsedDate.toISOString().split("T")[0];
    return {date: dateWithoutTime, value: parseFloat(value), category};
  }

  onSaveClick(): void {
    const lines = this.transactionInput
      .split("\n")
      .filter(line => line);
    const transactions = lines.map((line) => this.parseTransaction(line));
    const payload: CreateTransactionsPayload = {transactions};

    this.transactionsService.createTransactions(payload).subscribe({
      complete: () => console.log('Success to create transactions!', payload),
      error: (error) => console.error('Error to create transactions!', error)
    });

    this.dialogRef.close(payload);
  }
}
