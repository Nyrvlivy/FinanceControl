import {NgModule} from '@angular/core';
import {AppMaterialModule} from "@shared/app-material/app-material.module";
import {CommonModule} from '@angular/common';
import {CreateTransactionsDialogComponent} from './components/create-transactions-dialog/create-transactions-dialog.component';
import {DeleteAllTransactionsDialogComponent} from './components/delete-all-transactions-dialog/delete-all-transactions-dialog.component';
import {UpdateTransactionDialogComponent} from './components/update-transaction-dialog/update-transaction-dialog.component';
import {TransactionsTableComponent} from './components/transactions-table/transactions-table.component';

@NgModule({
  declarations: [
    CreateTransactionsDialogComponent,
    DeleteAllTransactionsDialogComponent,
    UpdateTransactionDialogComponent,
    TransactionsTableComponent,
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
  ],
  exports: [
    AppMaterialModule,
    CreateTransactionsDialogComponent,
    DeleteAllTransactionsDialogComponent,
    UpdateTransactionDialogComponent,
    TransactionsTableComponent,
  ]
})
export class SharedModule {
}
