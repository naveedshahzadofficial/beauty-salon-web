import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';

const routes: Routes = [
  // Client Routes
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
  {
    path: 'home',
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
  }]
  },
  // Admin Routes
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      redirectTo: '/dashboard',
      pathMatch: 'full',

    },
    {
      path: 'dashboard',
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    }
  ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
