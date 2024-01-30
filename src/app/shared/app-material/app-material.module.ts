import {NgModule} from '@angular/core';

import {MatButtonModule} from "@angular/material/button";

import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from "@angular/material/toolbar";
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  exports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatSortModule,
  ],

})
export class AppMaterialModule {
}
