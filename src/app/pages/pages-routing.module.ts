import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { StoriesComponent } from './stories/stories.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'services',
  component: ServicesComponent
},
{
  path: 'stories',
  component: StoriesComponent
},
{
  path: 'faqs',
  component: FaqsComponent
},
{
  path: 'contact-us',
  component: ContactUsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
