import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { PayoffComponent } from '../../payoffQuote/payoff.component';
import {AuthGuard} from '../../guard/auth.guard';
import {LogComponent} from "../../log/log.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent},
    { path: 'payoffQuote',      component: PayoffComponent },
    { path: 'log',           component: LogComponent  }
];
