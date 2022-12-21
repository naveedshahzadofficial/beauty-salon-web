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
  isOpenAddOn: boolean = false;

  constructor(private cartService: CartService) { }
  ngOnInit(): void {
  }

  addToCart() {
    if (this.service.addons?.length)
      this.isOpenAddOn = true;
    let cartService = Object.assign({}, this.service, { service_id: this.service.id, name: this.service.service_title, price: this.service.service_price, quantity: 1, is_same_time: true, addons: [] });
    console.log(cartService);
    this.cartService.addToCart(cartService);
  }

  isCartItem() {
    return this.cartService.isExist(this.service.id);
  }
  isClosedEvent(isOpenAddOn: boolean) {
    this.isOpenAddOn = isOpenAddOn;
  }
}
