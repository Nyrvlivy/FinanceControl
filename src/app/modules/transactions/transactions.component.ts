import {Component, OnInit} from '@angular/core';
import {CreateTransactionsDialogComponent} from '@shared/components/create-transactions-dialog/create-transactions-dialog.component';
import {DeleteAllTransactionsDialogComponent} from '@shared/components/delete-all-transactions-dialog/delete-all-transactions-dialog.component';
import {TransactionsService} from "@shared/services/transactions.service";

import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  public graphicDivSrc = "assets/images/pages/transactions/graphic-div.png";
  constructor(
    public dialog: MatDialog,
    private transactionsService: TransactionsService,
    private snackBar: MatSnackBar) {
  }

  openCreateTransactionDialog(): void {
    this.dialog.open(CreateTransactionsDialogComponent, {});
  }

  ngOnInit(): void {
  }

  openDeleteAllDialog(): void {
    const dialogRef = this.dialog.open(DeleteAllTransactionsDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transactionsService.deleteAllTransactions().subscribe({
          next: () => this.snackBar.open('All transactions deleted successfully!', 'Close', {duration: 3000}),
          error: (err) => this.snackBar.open(`Error: ${err.message}`, 'Close', {duration: 3000})
        });
      }
    });
  }
}
