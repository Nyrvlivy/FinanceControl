import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Transaction} from '@shared/types/transaction';
import {TransactionsService} from '@shared/services/transactions.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit, OnDestroy {

  isTotalVisible: boolean = false;
  dataSource: MatTableDataSource<Transaction>;
  displayedColumns: string[] = ['id', 'date', 'value', 'category', 'manage'];

  @ViewChild(MatSort, {static: true}) sort: MatSort | null = null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null = null;
  private transactionsSub: Subscription | null = null;

  constructor(private transactionsService: TransactionsService) {
    this.dataSource = new MatTableDataSource<Transaction>();
  }

  ngOnInit() {
    this.loadTransactions();
    this.transactionsSub = this.transactionsService.getTransactionsUpdateListener()
      .subscribe(() => {
        this.loadTransactions();
      });
  }

  ngOnDestroy() {
    if (this.transactionsSub) this.transactionsSub.unsubscribe();
  }

  toggleTotalVisibility() {
    this.isTotalVisible = !this.isTotalVisible;
  }

  loadTransactions() {
    this.transactionsService.findAllTransactions().subscribe(transactions => {
      this.dataSource.data = transactions;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateTransaction(id: number) {
  }

  deleteTransaction(id: number) {
  }

  calculateTotal(): number {
    return this.dataSource.data.reduce((acc, transaction) => acc + transaction.value, 0);
  }
}
