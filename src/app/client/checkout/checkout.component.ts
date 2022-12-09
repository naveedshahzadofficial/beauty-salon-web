import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDate, IDayCalendarConfig } from 'ng2-date-picker';
import { formatDate } from '@angular/common';
import { ITimeSelectConfig } from 'ng2-date-picker/lib/time-select/time-select-config.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
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

  constructor(private fb: FormBuilder) {
    this.createForm();
    console.log(this.currentTime);
  }

  ngOnInit(): void { }

  private createForm(): void {
    this.orderForm = this.fb.group({
      order_date: new FormControl(this.currentDate, Validators.required),
      order_time: new FormControl(this.currentTime, Validators.required),
      instructions: new FormControl(null, Validators.nullValidator),
    });
  }

  selectedTime(event: IDate) {
    this.orderForm.controls['order_time'].setValue(event.date.format('hh:mm A'));
  }
}
