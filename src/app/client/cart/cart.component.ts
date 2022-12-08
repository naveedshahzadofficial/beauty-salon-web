import { IService } from '@interfaces/service.interface';
import { CartService } from '@services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public services: IService[] = [];
  public grandTotal: number = 0;
  public totalCartItems: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartServices().subscribe((services) => {
      this.totalCartItems = services.length;
      this.grandTotal = this.cartService.getTotalPrice();
      this.services = services;
    });
  }

  removeFromCart(service: IService) {
    this.cartService.removeFromCart(service);
  }
}
