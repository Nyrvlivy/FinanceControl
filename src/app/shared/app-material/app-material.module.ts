import {NgModule} from '@angular/core';

import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from "@angular/material/toolbar";

@NgModule({
  exports: [
    MatButtonModule,
    MatTabsModule,
    MatToolbarModule,
  ],

})
export class AppMaterialModule {
}
