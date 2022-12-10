import { ClientService } from './../../../services/client.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICity } from '@interfaces/city.interface';
import { IArea } from '@interfaces/area.interface';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  public addressForm!: FormGroup;
  @Output() closedDialogEvent = new EventEmitter<boolean>();
  @Input() cities: ICity[] = [];
  @Input() areas: IArea[] = [];

  public filter_areas: IArea[] = [];

  error_messages = {
    city_id: [
      { type: 'required', message: 'Please select your city name.' },
    ],
    area_id: [
      { type: 'required', message: 'Please select your area name.' },
    ],
    address_1: [
      { type: 'required', message: 'Please enter your address.' },
    ],
  };

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.createForm();
  }

  ngOnInit(): void {

  }

  closedDialog() {
    this.closedDialogEvent.emit(true);
  }

  onSubmit(e: Event) {
    e.preventDefault();
    console.log(this.addressForm.value);
    if (this.addressForm.invalid) {
      Object.keys(this.addressForm.controls).forEach(field => {
        const control = this.addressForm.get(field);
        if (control)
          control.markAsTouched({ onlySelf: true });
      });
      return false
    };


    this.clientService.addAddress(this.addressForm.value).subscribe(resp => {
      this.closedDialogEvent.emit(true);
    });

    return true;
  }

  private createForm(): void {
    this.addressForm = this.fb.group({
      city_id: new FormControl(null, Validators.required),
      area_id: new FormControl(null, Validators.required),
      address_1: new FormControl(null, Validators.required),
    });
  }

  is_valid(field_name: string): boolean | undefined {
    return (
      this.addressForm.get(field_name)?.invalid &&
      this.addressForm.get(field_name)?.touched
    );
  }

  errorType(field_name: string, type: string = 'required') {
    return this.addressForm.controls[field_name].getError(type);
  }

  getAreas(e: any) {
    let city_id = parseInt(e.target.value);
    this.filter_areas = this.areas.filter(area => area.city_id === city_id);
  }

}
