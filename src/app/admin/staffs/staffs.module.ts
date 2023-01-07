import { SharedAdminModule } from '@app/admin/shared/shared-admin.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffsRoutingModule } from './staffs-routing.module';
import { StaffsComponent } from '@app/admin/staffs/staffs.component';
import { StaffIndexComponent } from '@app/admin/staffs/index/index.component';
import { StaffCreateComponent } from '@app/admin/staffs/create/create.component';
import { StaffEditComponent } from '@app/admin/staffs/edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from '@ngneat/input-mask';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    StaffsComponent,
    StaffIndexComponent,
    StaffCreateComponent,
    StaffEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputMaskModule,
    StaffsRoutingModule,
    SharedAdminModule,
    NgxSpinnerModule,
  ]
})
export class StaffsModule { }
