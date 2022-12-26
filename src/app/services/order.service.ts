import { IOrder } from '@interfaces/order.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '@services/data.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends DataService<IOrder>{

  constructor(http: HttpClient) {
    super('client/orders', http);
  }
}
