import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';
import {TransactionsService} from "@shared/services/transactions.service";
import {
  CreateTransactionsDialogComponent
} from '@shared/components/create-transactions-dialog/create-transactions-dialog.component';
import {
  DeleteAllTransactionsDialogComponent
} from '@shared/components/delete-all-transactions-dialog/delete-all-transactions-dialog.component';
import {TransactionsTableComponent} from "@shared/components/transactions-table/transactions-table.component";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public graphicDivSrc = "assets/images/pages/transactions/graphic-div.png";
  uniqueCategories: string[] = [];
  filterDate: string = '';
  filterCategory: string = '';

  @ViewChild(TransactionsTableComponent) tableComponent: TransactionsTableComponent | null = null;

  constructor(
    public dialog: MatDialog,
    private transactionsService: TransactionsService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.transactionsService.findAllTransactions().subscribe(transactions => {
      const allCategories = transactions.map(t => t.category);
      this.uniqueCategories = Array.from(new Set(allCategories));
    });
  }

  clearFilters(): void {
    this.filterDate = '';
    this.filterCategory = '';
    this.applyFilters();
  }

  openCreateTransactionDialog(): void {
    this.dialog.open(CreateTransactionsDialogComponent, {});
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

  applyFilters(): void {
    const formattedDate = this.formatDate(this.filterDate); // Formatar a data, se necessário
    if (this.tableComponent) {
      this.tableComponent.loadFilteredTransactions(formattedDate, this.filterCategory);
    }
  }

  private formatDate(date: string): string {
    if (date) {
      const dateObj = new Date(date);
      return dateObj.toISOString().split('T')[0];
    }
    return '';
  }
}
