import { IStatus } from './../../../interfaces/status.interface';
import { StatusService } from '@services/status.service';
import { IUser } from '@interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '@app/services/order.service';
import { CustomValidator } from '@common/custom-validator';
import { IOrder } from '@interfaces/order.interface';
import { ToastrService } from 'ngx-toastr';
import { StaffService } from '@services/staff.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class OrderEditComponent implements OnInit {

  orderForm!: FormGroup;
  order = {} as IOrder;
  statuses: IStatus[] = [];
  staffs: IUser[] = [];

  error_messages = {
    status_id: [
      { type: 'required', message: 'Please select your status.' }
    ],
    user_id: [
      { type: 'required', message: 'Please select your staff.' }
    ],
    status_file: [
      { type: 'required', message: 'Please attach your file.' }
    ],
    status_remark: [
      { type: 'required', message: 'Please enter your remark' }
    ]
  };

  constructor(private fb: FormBuilder,
    private customValidator: CustomValidator,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private statusService: StatusService,
    private staffService: StaffService,
    private orderService: OrderService,
  ) {
    this.createForm();
    this.getStatuses();
    this.getStaffs();

  }
  ngOnInit(): void {
  }

  createForm() {
    this.orderForm = this.fb.group({
      status_id: new FormControl(null,
        Validators.required
      ),
      user_id: new FormControl(null,
        Validators.nullValidator
      ),
      status_file: new FormControl(null,
        Validators.nullValidator
      ),
      status_remark: new FormControl(null,
        Validators.required
      ),
    });
  }

  getStatuses() {
    this.statusService.getAll()
      .subscribe(resp => this.statuses = resp.data);
  }

  getStaffs() {
    this.staffService.getAll().subscribe(resp => this.staffs = resp.data);
  }

  is_valid(field_name: string): boolean | undefined {
    return this.customValidator.is_valid(this.orderForm, field_name);
  }
  errorType(field_name: string, type: string = 'required') {
    return this.customValidator.errorType(this.orderForm, field_name, type);
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.orderForm.invalid) {
      Object.keys(this.orderForm.controls).forEach(field => {
        const control = this.orderForm.get(field);
        if (control)
          control.markAsTouched({ onlySelf: true });
      });
      return;
    };

  }

}
