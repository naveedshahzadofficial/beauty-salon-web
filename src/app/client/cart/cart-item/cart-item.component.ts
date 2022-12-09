import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICartItem } from '@interfaces/cart-item.interface';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem!: ICartItem;
  @Output() removeItemEvent = new EventEmitter<ICartItem>();
  quantity = 1;
  constructor() {}

  ngOnInit(): void {}

  removeItem(item: ICartItem): void {
    this.removeItemEvent.emit(item);
  }
}
