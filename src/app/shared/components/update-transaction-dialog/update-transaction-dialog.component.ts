import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TransactionsService} from '@shared/services/transactions.service';
import {Transaction} from '@shared/types/transaction';
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-update-transaction-dialog',
  templateUrl: './update-transaction-dialog.component.html',
  styleUrls: ['./update-transaction-dialog.component.scss'],
  providers: [DatePipe]
})
export class UpdateTransactionDialogComponent {
  isFormValid: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateTransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public transaction: Transaction,
    private transactionsService: TransactionsService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {
  }

  onCancelClick(): void {
    this.dialogRef.close({updated: false});
  }

  onSaveClick(): void {
    if (!this.isFormValid) {
      this.displayErrorMessages();
      return;
    }

    const formattedDate = this.datePipe.transform(this.transaction.date, 'yyyy-MM-dd');
    if (!formattedDate) {
      this.snackBar.open('Invalid date format', 'Close', {duration: 3000});
      return;
    }

    const updatedTransaction: Transaction = {
      id: this.transaction.id,
      date: formattedDate,
      value: parseFloat(this.transaction.value.toFixed(2)),
      category: this.transaction.category
    };

    this.transactionsService.updateTransaction(updatedTransaction).subscribe({
      next: () => {
        this.snackBar.open(`Transaction ${updatedTransaction.id} updated successfully`, 'Close', {duration: 3000});
        this.dialogRef.close({updated: true, transaction: updatedTransaction});
      },
      error: (err) => {
        this.snackBar.open(`Error: ${err.message}`, 'Close', {duration: 3000});
      }
    });
  }

  updateFormValidate(): void {
    this.isFormValid = !!this.transaction.id &&
      !!this.transaction.date &&
      !!this.transaction.value &&
      !!this.transaction.category && this.transaction.category.trim().length > 0;
  }

  displayErrorMessages(): void {
    if (!this.transaction.id) {
      this.snackBar.open('Transaction ID is required', 'Close', {duration: 3000});
    } else if (!this.transaction.date) {
      this.snackBar.open('Date cannot be null', 'Close', {duration: 3000});
    } else if (!this.transaction.value) {
      this.snackBar.open('Value cannot be zero or empty', 'Close', {duration: 3000});
    } else if (!this.transaction.category || this.transaction.category.trim().length === 0) {
      this.snackBar.open('Category cannot be null', 'Close', {duration: 3000});
    }
  }
}
