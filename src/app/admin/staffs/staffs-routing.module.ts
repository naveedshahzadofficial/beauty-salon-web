import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from '@app/guards/auth-admin.guard';
import { StaffsComponent } from '@app/admin/staffs/staffs.component';
import { HasRoleAdminGuard } from '@app/guards/has-role-admin.guard';
import { StaffIndexComponent } from '@app/admin/staffs/index/index.component';
import { StaffCreateComponent } from '@app/admin/staffs/create/create.component';
import { StaffEditComponent } from '@app/admin/staffs/edit/edit.component';

const routes: Routes = [
  {
    path: 'staffs',
    component: StaffsComponent,
    canActivate: [AuthAdminGuard, HasRoleAdminGuard],
    data: {
      roles: ['Super Admin', 'Admin'],
    },
    children: [
      {
        path: 'index',
        component: StaffIndexComponent
      },
      {
        path: 'create',
        component: StaffCreateComponent
      },
      {
        path: ':id/edit',
        component: StaffEditComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffsRoutingModule { }
