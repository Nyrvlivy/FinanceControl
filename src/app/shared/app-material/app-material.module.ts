import {NgModule} from '@angular/core';

import {MatButtonModule} from "@angular/material/button";

import {FormsModule} from "@angular/forms";
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatToolbarModule} from "@angular/material/toolbar";

@NgModule({
  exports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatToolbarModule,
  ],

})
export class AppMaterialModule {
}
