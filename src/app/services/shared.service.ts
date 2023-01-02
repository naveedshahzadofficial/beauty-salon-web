import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private readonly NEW_ORDER_ID = 'new_order_id';
  private _orderId$ = new BehaviorSubject<number>(0);

  checkoutClicked = new BehaviorSubject(false);
  constructor() {
    this._orderId$.next(this.orderId);
  }

  getOrderId() {
    return this._orderId$.asObservable();
  }
  getCheckoutClicked() {
    return this.checkoutClicked.asObservable();
  }


  set orderId(orderId: number) {
    localStorage.setItem(this.NEW_ORDER_ID, orderId.toString());
    this._orderId$.next(orderId);
  }

  get orderId(): number {
    let order_id = localStorage.getItem(this.NEW_ORDER_ID) as string;
    return parseInt(order_id);
  }

}
