import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { PayoffComponent } from '../../payoffQuote/payoff.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {LogComponent} from "../../log/log.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
      NgxSpinnerModule,
      ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
      PayoffComponent,
      LogComponent
  ]
})

export class AdminLayoutModule {}
