import {NgModule} from '@angular/core';
import {AppMaterialModule} from "@shared/app-material/app-material.module";
import {CommonModule} from '@angular/common';
import {CreateTransactionsDialogComponent} from './components/create-transactions-dialog/create-transactions-dialog.component';
import {UpdateTransactionDialogComponent} from './components/update-transaction-dialog/update-transaction-dialog.component';
import {TransactionsTableComponent} from './components/transactions-table/transactions-table.component';


@NgModule({
  declarations: [
    CreateTransactionsDialogComponent,
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
    UpdateTransactionDialogComponent,
    TransactionsTableComponent,
  ]
})
export class SharedModule {
}
