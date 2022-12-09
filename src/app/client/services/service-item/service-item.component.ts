import { IService } from '@interfaces/service.interface';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '@services/cart.service';
import { ICartItem } from '@app/interfaces/cart-item.interface';

@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss'],
})
export class ServiceItemComponent implements OnInit {
  @Input() service!: IService;
  cartItem!: ICartItem;
  isAddOn: boolean = false;
  isOpenAddOn: boolean = false;

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartItem = {
      id: this.service.id,
      name: this.service.service_title,
      price: this.service.service_price,
      quantity: 1,
      addons: [],
    };
    if (this.service.addons?.length) {
      this.isAddOn = true;
    }
  }

  addToCart(cartItem: ICartItem) {
    this.isOpenAddOn = true;
    this.cartService.addToCart(cartItem);
  }

  isCartItem(cartItem: ICartItem) {
    return this.cartService.isExist(cartItem);
  }
  isClosedEvent(isOpenAddOn: boolean) {
    this.isOpenAddOn = isOpenAddOn;
  }
}
