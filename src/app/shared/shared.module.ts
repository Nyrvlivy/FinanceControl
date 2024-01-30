import {NgModule} from '@angular/core';
import {AppMaterialModule} from "@shared/app-material/app-material.module";
import {CommonModule} from '@angular/common';
import {CreateTransactionsDialogComponent} from './components/create-transactions-dialog/create-transactions-dialog.component';


@NgModule({
  declarations: [
    CreateTransactionsDialogComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
  ],
  exports: [
    AppMaterialModule,
    CreateTransactionsDialogComponent
  ]
})
export class SharedModule {
}
