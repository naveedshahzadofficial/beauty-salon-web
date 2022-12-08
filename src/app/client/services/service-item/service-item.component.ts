import { ICartAddon } from './../../../interfaces/cart-addon.interface';
import { IService } from '@interfaces/service.interface';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '@services/cart.service';
import { IAddon } from '@interfaces/addon.interface';
import { ICartService } from '@interfaces/cart-service.interface';

@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss'],
})
export class ServiceItemComponent implements OnInit {
  @Input() isAddOn: boolean = true;
  @Input() service!: IService;
  @Input() addon!: IAddon;

  cartItem!: ICartService | ICartAddon;

  isOpenAddOn: boolean = false;
  addons: IAddon[] = [];

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    if (this.service) {
      this.cartItem = {
        id: this.service.id,
        name: this.service.service_title,
        price: this.service.service_price,
        quantity: 1,
        addons: [],
      };
    }
    if (this.addon) {
      this.cartItem = {
        id: this.addon.id,
        name: this.addon.addon_title,
        price: this.addon.addon_price,
        quantity: 1,
      };
    }
    if (this.service && this.service.addons) {
      this.addons = this.service.addons;
    }
  }

  addToCart(service: IService) {
    this.isOpenAddOn = true;
    this.cartService.addToCart(service);
  }

  isCartItem(service: IService) {
    return this.cartService.isExist(service);
  }
  isClosedEvent(isOpenAddOn: boolean) {
    this.isOpenAddOn = isOpenAddOn;
  }
}
