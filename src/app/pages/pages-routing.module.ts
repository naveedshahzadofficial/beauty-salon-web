import { StoryDetailComponent } from './story-detail/story-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import { HomeComponent } from './home/home.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { ServicesComponent } from './services/services.component';
import { StoriesComponent } from './stories/stories.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'services',
    component: ServicesComponent,
  },
  { path: 'services/:slug', component: ServiceDetailComponent },
  {
    path: 'stories',
    component: StoriesComponent,
  },
  { path: 'stories/:slug', component: StoryDetailComponent },
  {
    path: 'faqs',
    component: FaqsComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
