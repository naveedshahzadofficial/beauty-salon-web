import { InputMaskModule } from '@ngneat/input-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ServicesComponent } from './services/services.component';

@NgModule({
  declarations: [LoginComponent, DashboardComponent, RegisterComponent, ServicesComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    InputMaskModule,
  ]
})
export class ClientModule {}
