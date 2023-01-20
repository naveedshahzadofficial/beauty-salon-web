import { IOrder } from '@interfaces/order.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '@services/data.service';
import { catchError, map, retry } from 'rxjs';
import { handleError } from '@common/handle-errors';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends DataService<IOrder>{
  constructor(http: HttpClient) {
    super('client/orders', http);
  }

  getRecipient(order_id: number) {
    return this.http
      .post(`${this.base_url}/client/orders/${order_id}/recipient`, {})
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }

  cancelled(order_id: number) {
    return this.http
      .post(`${this.base_url}/client/orders/${order_id}/cancelled`, {})
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }
  submitted(order_id: number) {
    return this.http
      .post(`${this.base_url}/client/orders/${order_id}/submitted`, {})
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }

  getTransfer(order_id: number) {
    return this.http
      .post(`${this.base_url}/admin/orders/${order_id}/get-transfer`, {})
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }

  storeTransfer(order_id: number, formData: any) {
    return this.http
      .post(`${this.base_url}/admin/orders/${order_id}/store-transfer`, formData)
      .pipe(retry(1), catchError(handleError));
  }

}
