import { IStatus } from '@interfaces/status.interface';
import { IUser } from '@interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '@app/services/order.service';
import { CustomValidator } from '@common/custom-validator';
import { IOrder } from '@interfaces/order.interface';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { IOrderTransfer } from '@interfaces/order-transfer.interface';
import { IResponse } from '@interfaces/response.interface';
import { AppError } from '@common/app-error';
import { ValidationError } from '@common/validation-error';

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
    to_user_id: [
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
    private orderService: OrderService,
  ) {
    this.createForm();
    this.getTransfer();

  }
  ngOnInit(): void {
  }

  createForm() {
    this.orderForm = this.fb.group({
      status_id: new FormControl(null,
        Validators.required
      ),
      to_user_id: new FormControl(null,
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

  getTransfer() {
    this.route.params.pipe(
      switchMap((resp: any) => this.orderService.getTransfer(resp.id)),
    ).subscribe((resp: IOrderTransfer) => {
      this.order = resp.order;
      this.statuses = resp.statuses;
      this.staffs = resp.staffs;
    });
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

    let formData = this.orderForm.value;
    formData.order_id = this.order.id;
    if (formData.to_user_id === null) {
      formData.to_user_id = this.order.order_status.to_user_id;
    }
    this.orderService.storeTransfer(this.order.id, formData).subscribe({
      next: (resp: IResponse<IOrder>) => {
        this.orderForm.reset();
        this.toastr.success(resp.message, 'Success!');
        this.router.navigate(['admin/orders/index']);
      },
      error: (e: AppError) => {
        if (e instanceof ValidationError) {
          this.customValidator.extractErrors(
            this.orderForm,
            e.errors,
            this.error_messages
          );
        } else throw e;
      },
    });


  }

}
