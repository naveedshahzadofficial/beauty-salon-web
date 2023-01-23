import { AddressComponent } from '@app/admin/profile/address/address.component';
import { BeautyComponent } from '@app/admin/profile/beauty/beauty.component';
import { PersonalComponent } from '@app/admin/profile/personal/personal.component';
import { ProfileComponent } from '@app/admin/profile/profile.component';
import { DashboardComponent } from '@app/admin/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@app/admin/login/login.component';
import { AuthAdminGuard } from '@app/guards/auth-admin.guard';
import { HasRoleAdminGuard } from '@app/guards/has-role-admin.guard';
import { PasswordComponent } from '@app/admin/profile/password/password.component';


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
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthAdminGuard, HasRoleAdminGuard],
    data: {
      roles: ['Super Admin', 'Admin', 'Staff'],
    },
    children: [{
      path: 'personal',
      component: PersonalComponent,
    },
    {
      path: 'beauty',
      component: BeautyComponent,
    },
    {
      path: 'change-password',
      component: PasswordComponent,
    },
    {
      path: 'address',
      component: AddressComponent,
    }]
  },
  {
    path: 'staffs',
    loadChildren: () => import('@app/admin/staffs/staffs.module').then(mod => mod.StaffsModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('@app/admin/clients/clients.module').then(mod => mod.ClientsModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('@app/admin/orders/orders.module').then(mod => mod.OrdersModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
