import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { PagesRoutingModule } from './pages-routing.module';
import { ServiceCardsComponent } from '../components/service-cards/service-cards.component';
import { StoryCardsComponent } from '../components/story-cards/story-cards.component';
import { SliderComponent } from '../components/slider/slider.component';

import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { StoriesComponent } from './stories/stories.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PageService } from '../services/page.service';



@NgModule({
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
  ],
  declarations: [
    ServiceCardsComponent,
    SliderComponent,
    StoryCardsComponent,
    HomeComponent,
    ServicesComponent,
    StoriesComponent,
    FaqsComponent,
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CarouselModule,
    ReactiveFormsModule,
  ],
  providers:[
    PageService
  ]
})
export class PagesModule { }
