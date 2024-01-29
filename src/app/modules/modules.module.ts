import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppMaterialModule} from "@shared/app-material/app-material.module";
import {SharedModule} from '@shared/shared.module';

import {ModulesRoutingModule} from './modules-routing.module';
import {HomeComponent} from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    SharedModule,
    ModulesRoutingModule
  ]
})
export class ModulesModule {
}