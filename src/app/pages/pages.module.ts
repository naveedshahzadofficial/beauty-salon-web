import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { ServiceCardsComponent } from '../components/service-cards/service-cards.component';
import { SliderComponent } from '../components/slider/slider.component';
import { ServicesComponent } from './services/services.component';
import { StoriesComponent } from './stories/stories.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


@NgModule({
  declarations: [
    HomeComponent,
    ServiceCardsComponent,
    SliderComponent,
    ServicesComponent,
    StoriesComponent,
    FaqsComponent,
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CarouselModule,
  ]
})
export class PagesModule { }
