import { IOrder } from '@interfaces/order.interface';
import { mergeMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '@services/order.service';
import { SharedService } from '@services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.scss']
})
export class RecipientComponent implements OnInit {
  order!: IOrder;
  constructor(
    private sharedService: SharedService,
    private orderService: OrderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.sharedService.getOrderId().pipe(
      mergeMap((order_id: number) => this.orderService.getRecipient(order_id))
    ).subscribe((resp: IOrder) => {
      this.order = resp;
    });
  }

  onSubmit(): void {

  }

  onCancel(): void {
    this.router.navigate(['client/categories']);
  }

}
