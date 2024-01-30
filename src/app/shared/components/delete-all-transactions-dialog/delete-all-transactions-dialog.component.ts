import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-all-transactions-dialog',
  templateUrl: './delete-all-transactions-dialog.component.html',
  styleUrls: ['./delete-all-transactions-dialog.component.scss']
})
export class DeleteAllTransactionsDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteAllTransactionsDialogComponent>) {
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.dialogRef.close(true);
  }
}
