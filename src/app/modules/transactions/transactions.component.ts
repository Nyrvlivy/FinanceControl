import {Component, OnInit} from '@angular/core';
import {
  CreateTransactionsDialogComponent
} from '@shared/components/create-transactions-dialog/create-transactions-dialog.component';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {


  constructor(public dialog: MatDialog) {
  }

  openCreateTransactionDialog(): void {
    this.dialog.open(CreateTransactionsDialogComponent, {

    });
  }

  ngOnInit(): void {
  }
}
