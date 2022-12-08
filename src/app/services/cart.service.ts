import { IService } from '@interfaces/service.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartServices$ = new BehaviorSubject<IService[]>([]);
  private cartServices: IService[] = [];

  constructor() {}

  getCartServices(): Observable<IService[]> {
    return this._cartServices$.asObservable();
  }

  setCartServices(services: IService[]) {
    this.cartServices.push(...services);
    this._cartServices$.next(services);
  }

  addToCart(service: IService) {
    if (!this.isExist(service)) {
      this.cartServices.push(service);
      this._cartServices$.next(this.cartServices);
      this.getTotalPrice();
    }
  }

  getTotalPrice(): number {
    return this.cartServices.reduce(
      (total, service: IService) =>
        total + parseFloat(service.service_price.toString()),
      0
    );
  }

  removeFromCart(service: IService) {
    this.cartServices.map((_service: IService, index: number) => {
      if (service.id === _service.id) this.cartServices.splice(index, 1);
    });
    this._cartServices$.next(this.cartServices);
  }

  clearCart() {
    this.cartServices = [];
    this._cartServices$.next(this.cartServices);
  }

  isExist(service: IService): boolean {
    return (
      this.cartServices.filter((_service) => _service.id === service.id)
        .length > 0
    );
  }
}
