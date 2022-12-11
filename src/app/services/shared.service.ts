import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  checkoutClicked = new BehaviorSubject(false);

  constructor() { }

  getCheckoutClicked() {
    return this.checkoutClicked.asObservable();
  }
}
