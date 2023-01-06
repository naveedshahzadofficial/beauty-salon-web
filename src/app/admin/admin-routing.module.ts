import { StaffCreateComponent } from '@app/admin/staffs/create/create.component';
import { StaffIndexComponent } from '@app/admin/staffs/index/index.component';
import { OrdersComponent } from '@app/admin/orders/orders.component';
import { ClientsComponent } from '@app/admin/clients/clients.component';
import { StaffsComponent } from '@app/admin/staffs/staffs.component';
import { DashboardComponent } from '@app/admin/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@app/admin/login/login.component';
import { StaffEditComponent } from '@app/admin/staffs/edit/edit.component';
import { AuthAdminGuard } from '@app/guards/auth-admin.guard';
import { HasRoleAdminGuard } from '@app/guards/has-role-admin.guard';
import { ClientIndexComponent } from '@app/admin/clients/index/index.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthAdminGuard, HasRoleAdminGuard],
    data: {
      roles: ['Super Admin', 'Admin', 'Staff'],
    },
    children: [{
      path: 'dashboard',
      component: DashboardComponent,
    }]
  },
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
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthAdminGuard, HasRoleAdminGuard],
    data: {
      roles: ['Super Admin', 'Admin'],
    },
    children: [
      {
        path: 'index',
        component: ClientIndexComponent
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
  },
  {
    path: 'orders/index',
    component: OrdersComponent,
    canActivate: [AuthAdminGuard, HasRoleAdminGuard],
    data: {
      roles: ['Super Admin', 'Admin'],
    },
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
