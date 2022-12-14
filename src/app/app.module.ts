import { ErrorHandler } from '@angular/core';
import { AppErrorHandler } from './common/app-error-handler';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './layouts/client-layout/header/header.component';
import { TopBarComponent } from './layouts/client-layout/header/top-bar/top-bar.component';
import { FooterComponent } from './layouts/client-layout/footer/footer.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CategoryService } from '@services/category.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SidebarComponent } from './layouts/admin-layout/sidebar/sidebar.component';
import { TopbarComponent } from './layouts/admin-layout/topbar/topbar.component';
import { ToastrModule } from 'ngx-toastr';

import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  declarations: [
    AppComponent,
    HeaderComponent,
    TopBarComponent,
    FooterComponent,
    ClientLayoutComponent,
    AdminLayoutComponent,
    SidebarComponent,
    TopbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ closeButton: true }),
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule,
  ],
  providers: [
    CategoryService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
