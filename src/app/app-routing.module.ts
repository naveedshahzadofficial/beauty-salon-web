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
      redirectTo: '/client',
      pathMatch: 'full'
    },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
  }]
  },
  // Admin Routes
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      redirectTo: '/admin',
      pathMatch: 'full',

    },
    {
      path: 'admin',
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
