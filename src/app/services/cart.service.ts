import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICartItem } from '@interfaces/cart-item.interface';
import { ICartAddon } from '@app/interfaces/cart-addon.interface';

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

  addToCartAddons(cartItemId: number, cartItemAddons: ICartAddon[]) {
    let cartItem = this.cartItems.find(
      (_cartItem) => _cartItem.id === cartItemId
    );
    if (cartItem !== undefined) cartItem.addons?.push(...cartItemAddons);

    this._cartItems$.next(this.cartItems);
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItems.map((_cartItem) => {
      grandTotal += parseInt(_cartItem.price.toString()) * _cartItem.quantity;
      if (_cartItem.addons?.length) {
        grandTotal += _cartItem.addons.reduce(
          (total, _cartAddonItem: ICartAddon) =>
            total +
            parseInt(_cartAddonItem.price.toString()) * _cartAddonItem.quantity,
          0
        );
      }
    });
    return grandTotal;
  }

  removeFromCart(cartItem: ICartItem) {
    cartItem.addons = [];
    cartItem.quantity = 1;
    this.cartItems = this.cartItems.filter(
      (_cartItem) => cartItem.id !== _cartItem.id
    );
    this._cartItems$.next(this.cartItems);
  }

  removeAddonFromCart(cartItem: ICartItem, cartItemAddon: ICartAddon) {
    let addons = cartItem.addons?.filter(
      (_cartItemAddon) => _cartItemAddon.id !== cartItemAddon.id
    );
    cartItem.addons = addons;
    this._cartItems$.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this._cartItems$.next(this.cartItems);
  }

  isExist(cartItem: ICartItem): boolean {
    let item = this.cartItems.find((_cartItem) => _cartItem.id === cartItem.id);
    return item !== undefined;
  }

  isExistAddon(cartItemId: number, cartItemAddon: ICartAddon): boolean {
    let cartItem = this.cartItems.find(
      (_cartItem) => _cartItem.id === cartItemId
    );
    const addonItem = cartItem?.addons?.find(
      (_cartItemAddon) => _cartItemAddon.id === cartItemAddon.id
    );
    return addonItem !== undefined;
  }
}
