import { ICartItem } from './../interfaces/cart-item.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartItems$ = new BehaviorSubject<ICartItem[]>([]);
  private cartItems: ICartItem[] = [];

  constructor() {}

  getCartItems(): Observable<ICartItem[]> {
    return this._cartItems$.asObservable();
  }

  setCartItems(cartItems: ICartItem[]) {
    this.cartItems.push(...cartItems);
    this._cartItems$.next(cartItems);
  }

  addToCart(cartItem: ICartItem) {
    if (!this.isExist(cartItem)) {
      this.cartItems.push(cartItem);
      this._cartItems$.next(this.cartItems);
      this.getTotalPrice();
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, cartItem: ICartItem) =>
        total + parseFloat(cartItem.price.toString()),
      0
    );
  }

  removeFromCart(cartItem: ICartItem) {
    this.cartItems.map((_cartItem: ICartItem, index: number) => {
      if (cartItem.id === _cartItem.id) this.cartItems.splice(index, 1);
    });
    this._cartItems$.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this._cartItems$.next(this.cartItems);
  }

  isExist(cartItem: ICartItem): boolean {
    return (
      this.cartItems.filter((_cartItem) => _cartItem.id === cartItem.id)
        .length > 0
    );
  }
}
