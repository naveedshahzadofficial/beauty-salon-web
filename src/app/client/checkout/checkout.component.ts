import { OrderService } from './../../services/order.service';
import { CartService } from './../../services/cart.service';
import { IArea } from '@interfaces/area.interface';
import { ICity } from '@interfaces/city.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDate, IDayCalendarConfig } from 'ng2-date-picker';
import { formatDate } from '@angular/common';
import { ClientService } from '@services/client.service';
import { IAddress } from '@interfaces/address.interface';
import { SharedService } from '@services/shared.service';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  currentDate = formatDate(new Date(), 'dd-MM-YYYY', 'en');
  currentTime = formatDate(new Date(), 'hh:mm aaa', 'en');
  public dpConfig = <IDayCalendarConfig>{
    locale: 'en',
    format: 'DD-MM-YYYY',
    required: true,
    monthFormat: 'MMMM, YYYY',
    firstDayOfWeek: 'su',
    min: this.currentDate,
    minDate: this.currentDate,

  };

  public dptConfig = <IDayCalendarConfig>{
    format: 'hh:mm A',
    required: true,
    minTime: this.currentTime,
  };

  public orderForm!: FormGroup;

  isOpenAddressDialog = false;

  public cities: ICity[] = [];
  public areas: IArea[] = [];
  public addresses: IAddress[] = [];

  error_messages = {
    order_date: [
      { type: 'required', message: 'Please select your order date.' },
    ],
    order_time: [
      { type: 'required', message: 'Please set your order time.' },
    ],
    address_id: [
      { type: 'required', message: 'Please select your address.' },
    ],
  };

  checkoutClicked!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private sharedService: SharedService,
    private cartService: CartService,
    private orderService: OrderService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.clientService.getCheckoutPage().subscribe(resp => {
      this.cities = resp.cities;
      this.areas = resp.areas;
      this.addresses = resp.addresses;
    });

    this.checkoutClicked = this.sharedService.getCheckoutClicked().subscribe((resp: boolean) => {
      if (resp) {
        this.onSubmit();
      }
    });
  }

  private createForm(): void {
    this.orderForm = this.fb.group({
      order_date: new FormControl(this.currentDate, Validators.required),
      order_time: new FormControl(this.currentTime, Validators.required),
      address_id: new FormControl(null, Validators.required),
      special_notes: new FormControl(null, Validators.nullValidator),
    });
  }

  selectedTime(event: IDate) {
    this.orderForm.controls['order_time'].setValue(event.date.format('hh:mm A'));
  }

  openAddressDialog(e: any) {
    e.preventDefault();
    this.isOpenAddressDialog = true;
  }

  closedDialogEvent(e: boolean) {
    this.getAddresses();
    this.isOpenAddressDialog = false;
  }
  selectAddress(e: any, address: IAddress) {
    e.preventDefault();
    this.orderForm.controls['address_id'].setValue(address.id);
  }

  is_valid(field_name: string): boolean | undefined {
    return (
      this.orderForm.get(field_name)?.invalid &&
      this.orderForm.get(field_name)?.touched
    );
  }

  errorType(field_name: string, type: string = 'required') {
    return this.orderForm.controls[field_name].getError(type);
  }

  is_address(address_id: any) {
    let select_value = this.orderForm.get('address_id')?.value;
    return (select_value === address_id);
  }

  getAddresses() {
    this.clientService.getAddresses().subscribe(resp => this.addresses = resp);
  }

  onSubmit() {
    console.log(this.orderForm.value);
    if (this.orderForm.invalid) {
      Object.keys(this.orderForm.controls).forEach(field => {
        const control = this.orderForm.get(field);
        if (control)
          control.markAsTouched({ onlySelf: true });
      });
      return false
    };


    // this.cartService.getCartItems().subscribe(resp => {
    //   console.log(resp);
    // });

    this.orderService.store(this.orderForm.value).subscribe(resp => {
      console.log(resp);
    });

    //this.router.navigate(['client/categories/recipient']);
    return true;
  }

  ngOnDestroy(): void {
    this.sharedService.checkoutClicked.next(false);
    this.checkoutClicked.unsubscribe();
  }
}
