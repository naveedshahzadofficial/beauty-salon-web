import { ICartAddon } from '@interfaces/cart-addon.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '@services/data.service';

@Injectable({
  providedIn: 'root'
})
export class CartAddonService extends DataService<ICartAddon>{

  constructor(http: HttpClient) {
    super('client/cart-addons', http);
  }
}
