import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ]
})
export class ClientModule { }
