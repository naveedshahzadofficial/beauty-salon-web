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

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    children: [{
      path: 'dashboard',
      component: DashboardComponent,
    }]
  },
  {
    path: 'staffs',
    component: StaffsComponent,
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
    path: 'clients/index',
    component: ClientsComponent,
  },
  {
    path: 'orders/index',
    component: OrdersComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
