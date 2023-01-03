import { CartService } from '@services/cart.service';
import { IOrder } from '@interfaces/order.interface';
import { mergeMap, tap } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '@services/order.service';
import { SharedService } from '@services/shared.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.scss']
})
export class RecipientComponent implements OnInit, OnDestroy {
  order!: IOrder;
  subscription!: Subscription;
  isSubmitted: boolean = false;
  constructor(
    private sharedService: SharedService,
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.subscription = this.sharedService.getOrderId().pipe(
      mergeMap((order_id: number) => this.orderService.getRecipient(order_id))
    ).subscribe((resp: IOrder) => {
      this.order = resp;
    });
  }

  onSubmit(): void {
    this.orderService.submitted(this.order.id).pipe(
      tap(() => this.cartService.clearCart())
    ).subscribe(() => {
      this.sharedService.removeOrder();
      this.isSubmitted = true;
    });
  }

  onCancel(): void {
    this.orderService.cancelled(this.order.id).subscribe(() => {
      this.sharedService.removeOrder();
      this.router.navigate(['client/categories']);
    });
  }

  ngOnDestroy(): void {
    this.sharedService.checkoutClicked.next(false);
    this.subscription.unsubscribe();
  }

}
