import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from '@app/admin/clients/clients.component';
import { ClientIndexComponent } from '@app/admin/clients/index/index.component';
import { ClientCreateComponent } from '@app/admin/clients/create/create.component';
import { ClientEditComponent } from '@app/admin/clients/edit/edit.component';
import { HasRoleAdminGuard } from '@app/guards/has-role-admin.guard';
import { AuthAdminGuard } from '@app/guards/auth-admin.guard';
const routes: Routes = [
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
        component: ClientCreateComponent
      },
      {
        path: ':id/edit',
        component: ClientEditComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
