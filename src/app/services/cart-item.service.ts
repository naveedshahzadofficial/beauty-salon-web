import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { handleError } from '@common/handle-errors';
import { ICartItem } from '@interfaces/cart-item.interface';
import { DataService } from '@services/data.service';
import { catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartItemService extends DataService<ICartItem>{

  constructor(http: HttpClient) {
    super('client/cart-items', http);
  }

  destoryAll() {
    return this.http.post(`${this.base_url}/client/cart-items/destroy-all`, {})
      .pipe(retry(1), catchError(handleError));
  }

  cartAddons(cartItemId: number, cartItemAddons: any[]) {
    return this.http.post(`${this.base_url}/client/cart-items/${cartItemId}/cart-addons`, { 'cart_addons': cartItemAddons })
      .pipe(retry(1), catchError(handleError));
  }
}
