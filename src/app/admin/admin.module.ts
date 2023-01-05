import { StaffIndexComponent } from '@app/admin/staffs/index/index.component';
import { StaffCreateComponent } from '@app/admin/staffs/create/create.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from '@ngneat/input-mask';
import { StaffsComponent } from './staffs/staffs.component';

import { ClientsComponent } from './clients/clients.component';
import { OrdersComponent } from './orders/orders.component';
import { BaseTableComponent } from './shared/base-table/base-table.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { DeleteModalComponent } from './shared/delete-modal/delete-modal.component';
import { StaffEditComponent } from './staffs/edit/edit.component';



@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    StaffsComponent,
    StaffIndexComponent,
    StaffCreateComponent,
    StaffEditComponent,
    ClientsComponent,
    OrdersComponent,
    BaseTableComponent,
    PaginationComponent,
    DeleteModalComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputMaskModule
  ]
})
export class AdminModule { }
