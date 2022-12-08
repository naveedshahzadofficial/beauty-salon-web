import { IService } from '@interfaces/service.interface';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss'],
})
export class ServiceItemComponent implements OnInit {
  @Input() isAddOn: boolean = true;
  @Input() service!: IService;
  isOpenAddOn: boolean = false;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {}

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
