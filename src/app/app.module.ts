import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import {AuthGuard} from "./guard/auth.guard";

import {FakeBackendInterceptor} from "./helpers/fake-backend";
import {ErrorInterceptor} from "./helpers/error-interceptor";


import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {PayoffService} from "./services/payoffService/payoff.service";
import {NgxSpinnerModule} from "ngx-spinner";
import { LogComponent } from './log/log.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    NgxSpinnerModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  // providers: [AuthGuard, PayoffService,
  //     { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true }
  // ],
    providers: [AuthGuard, PayoffService],

    bootstrap: [AppComponent]
})
export class AppModule { }
