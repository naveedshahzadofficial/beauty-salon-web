import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '@app/services/order.service';
import { CustomValidator } from '@common/custom-validator';
import { IOrder } from '@interfaces/order.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class OrderEditComponent implements OnInit {

  orderForm!: FormGroup;
  order = {} as IOrder;
  error_messages = {
    status_id: [
      { type: 'required', message: 'Please select your status.' }
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
  }
  ngOnInit(): void {
  }
  createForm() {
    this.orderForm = this.fb.group({
      status_id: new FormControl(
        null,
        Validators.compose([
          Validators.required
        ])
      ),
    });
  }

}
