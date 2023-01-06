import { HasRoleGuard } from '@app/guards/has-role.guard';
import { RecipientComponent } from './recipient/recipient.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ServicesComponent } from './services/services.component';
import { CategoriesComponent } from './categories/categories.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      roles: ['Client'],
    },
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      roles: ['Client'],
    },
    children: [
      {
        path: 'services/:slug',
        component: ServicesComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
    ],
  },
  {
    path: 'recipient',
    component: RecipientComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      roles: ['Client'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule { }
