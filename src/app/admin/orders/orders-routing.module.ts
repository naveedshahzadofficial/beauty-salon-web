import { OrdersComponent } from '@app/admin/orders/orders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from '@app/guards/auth-admin.guard';
import { HasRoleAdminGuard } from '@app/guards/has-role-admin.guard';
import { OrderIndexComponent } from '@app/admin/orders/index/index.component';
import { OrderCreateComponent } from '@app/admin/orders/create/create.component';
import { OrderEditComponent } from '@app/admin/orders/edit/edit.component';
import { OrderShowComponent } from '@app/admin/orders/show/show.component';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthAdminGuard, HasRoleAdminGuard],
    data: {
      roles: ['Super Admin', 'Admin'],
    },
    children: [
      {
        path: 'index',
        component: OrderIndexComponent
      },
      {
        path: 'create',
        component: OrderCreateComponent
      },
      {
        path: ':id/show',
        component: OrderShowComponent
      },
      {
        path: ':id/edit',
        component: OrderEditComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
