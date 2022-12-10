import { InputMaskModule } from '@ngneat/input-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ServicesComponent } from './services/services.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { AddonsComponent } from './services/addons/addons.component';
import { ServiceItemComponent } from './services/service-item/service-item.component';
import { AddonItemComponent } from './services/addons/addon-item/addon-item.component';
import { CartAddonItemComponent } from './cart/cart-addon-item/cart-addon-item.component';
import { CategoriesComponent } from './categories/categories.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { AddressesComponent } from './shared/addresses/addresses.component';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    ServicesComponent,
    CartComponent,
    CartItemComponent,
    AddonsComponent,
    ServiceItemComponent,
    AddonItemComponent,
    CartAddonItemComponent,
    CategoriesComponent,
    CheckoutComponent,
    AddressesComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    InputMaskModule,
    FormsModule,
    DpDatePickerModule,
  ],
})
export class ClientModule {}
