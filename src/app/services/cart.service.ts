import { IService } from '@interfaces/service.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  _cartServices$ = new BehaviorSubject<IService[]>([]);
  cartServices$ = this._cartServices$.asObservable();
  constructor() { }

  getServices(){

  }
  addToCart(service: IService) {
    this.cartServices$
  }
}
