import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from '@services/shared.service';
import { ICartItem } from '@interfaces/cart-item.interface';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem!: ICartItem;
  @Output() removeItemEvent = new EventEmitter<ICartItem>();
  @Output() changedItemQtyEvent = new EventEmitter<ICartItem>();
  constructor() { }

  ngOnInit(): void { }
}
