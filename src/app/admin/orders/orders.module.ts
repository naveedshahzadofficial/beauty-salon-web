import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from '@app/admin/orders/orders-routing.module';
import { OrderCreateComponent } from '@app/admin/orders/create/create.component';
import { OrderIndexComponent } from '@app/admin/orders/index/index.component';
import { OrderShowComponent } from '@app/admin/orders/show/show.component';
import { OrderEditComponent } from '@app/admin/orders/edit/edit.component';
import { OrdersComponent } from '@app/admin/orders/orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from '@ngneat/input-mask';
import { SharedAdminModule } from '../shared/shared-admin.module';


@NgModule({
  declarations: [
    OrderCreateComponent,
    OrderIndexComponent,
    OrderShowComponent,
    OrderEditComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputMaskModule,
    SharedAdminModule,
  ]
})
export class OrdersModule { }
