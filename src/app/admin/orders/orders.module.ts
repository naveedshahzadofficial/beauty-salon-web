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
import { NgxSpinnerModule } from 'ngx-spinner';
import { FullnamePipe } from '@app/pipes/fullname.pipe';


@NgModule({
  declarations: [
    OrderCreateComponent,
    OrderIndexComponent,
    OrderShowComponent,
    OrderEditComponent,
    OrdersComponent,
    FullnamePipe
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputMaskModule,
    SharedAdminModule,
    NgxSpinnerModule,
  ]
})
export class OrdersModule { }
