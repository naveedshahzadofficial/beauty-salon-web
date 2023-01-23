import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from '@app/admin/admin-routing.module';
import { DashboardComponent } from '@app/admin/dashboard/dashboard.component';
import { LoginComponent } from '@app/admin/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from '@ngneat/input-mask';


import { OrdersModule } from '@app/admin/orders/orders.module';
import { StaffsModule } from '@app/admin/staffs/staffs.module';
import { ClientsModule } from '@app/admin/clients/clients.module';
import { ProfileComponent } from './profile/profile.component';
import { PersonalComponent } from './profile/personal/personal.component';
import { BeautyComponent } from './profile/beauty/beauty.component';
import { AddressComponent } from './profile/address/address.component';
import { PasswordComponent } from './profile/password/password.component';



@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    ProfileComponent,
    PersonalComponent,
    BeautyComponent,
    AddressComponent,
    PasswordComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputMaskModule,
    StaffsModule,
    ClientsModule,
    OrdersModule,
  ]
})
export class AdminModule { }
