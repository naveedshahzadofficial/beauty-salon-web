import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from '@app/admin/clients/clients.component';
import { ClientIndexComponent } from '@app/admin/clients/index/index.component';
import { ClientCreateComponent } from '@app/admin/clients/create/create.component';
import { ClientEditComponent } from '@app/admin/clients/edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from '@ngneat/input-mask';
import { SharedAdminModule } from '@app/admin/shared/shared-admin.module';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientIndexComponent,
    ClientCreateComponent,
    ClientEditComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputMaskModule,
    SharedAdminModule,
  ]
})
export class ClientsModule { }
