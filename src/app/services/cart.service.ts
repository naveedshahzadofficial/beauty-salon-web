import { mergeMap } from 'rxjs/operators';
import { IResponses } from '@interfaces/responses.interface';
import { CartItemService } from '@services/cart-item.service';
import { environment } from '@env/environment';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ICartItem } from '@interfaces/cart-item.interface';
import { ICartAddon } from '@interfaces/cart-addon.interface';
import { IResponse } from '@interfaces/response.interface';
import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {
  protected base_url = environment.base_url;
  private _cartItems$ = new BehaviorSubject<ICartItem[]>([]);
  private cartItems: ICartItem[] = [];
  subscription!: Subscription;

  constructor(public authService: AuthService,
    private cartItemService: CartItemService) {

    this.subscription = this.authService.isLoggedIn$.pipe(
      mergeMap((resp: boolean) => resp ? this.cartItemService.getAll() : []),
    ).subscribe((resp: IResponses<ICartItem>) => {
      this.setCartItems(resp.data);
    });
  }



  getCartItems(): Observable<ICartItem[]> {
    return this._cartItems$.asObservable();
  }

  setCartItems(cartItems: ICartItem[]) {
    this.cartItems.push(...cartItems);
    this._cartItems$.next(cartItems);
  }



  addToCart(serviceItem: any) {
    if (this.isExist(serviceItem.service_id))
      return;
    this.cartItemService.store(serviceItem).subscribe((resp: IResponse<ICartItem>) => {
      this.cartItems.push(resp.data);
      this._cartItems$.next(this.cartItems);
      this.getTotalPrice();
    });

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
    //cartItem.addons = [];
    //cartItem.quantity = 1;
    this.cartItemService.destroy(cartItem.id).subscribe((resp) => {
      this.cartItems = this.cartItems.filter(
        (_cartItem) => cartItem.id !== _cartItem.id
      );
      this._cartItems$.next(this.cartItems);
    });
  }

  removeAddonFromCart(cartItem: ICartItem, cartItemAddon: ICartAddon) {
    let addons = cartItem.addons?.filter(
      (_cartItemAddon) => _cartItemAddon.id !== cartItemAddon.id
    );
    cartItem.addons = addons;
    this._cartItems$.next(this.cartItems);
  }

  clearCart() {
    this.cartItemService.destoryAll().subscribe((resp) => {
      this.cartItems = [];
      this._cartItems$.next(this.cartItems);
    });
  }

  isExist(serviceId: Number): boolean {
    let item = this.cartItems.find((_cartItem) => _cartItem.service_id === serviceId);
    return item !== undefined;
  }

  isExistAddon(serviceId: number, addonId: number): boolean {
    let cartItem = this.cartItems.find(
      (_cartItem) => _cartItem.service_id === serviceId
    );
    const addonItem = cartItem?.addons?.find(
      (_cartItemAddon) => _cartItemAddon.id === addonId
    );
    return addonItem !== undefined;
  }

  changedItemQtyEvent(cartItem: ICartItem) {
    this.cartItemService.update(cartItem).subscribe(resp => {
      this._cartItems$.next(this.cartItems);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
