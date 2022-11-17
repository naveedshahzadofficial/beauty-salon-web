import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './slider/slider.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { LoginComponent } from './login/login.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    HomeComponent,
    SliderComponent,
    ServiceCardComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    CarouselModule,
  ]
})
export class ClientModule { }
