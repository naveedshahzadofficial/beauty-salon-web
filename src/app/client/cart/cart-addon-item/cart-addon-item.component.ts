import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICartAddon } from '@interfaces/cart-addon.interface';

@Component({
  selector: 'app-cart-addon-item',
  templateUrl: './cart-addon-item.component.html',
  styleUrls: ['./cart-addon-item.component.scss'],
})
export class CartAddonItemComponent implements OnInit {
  @Input() cartAddonItem!: ICartAddon;
  @Output() removeAddonItemEvent = new EventEmitter<ICartAddon>();

  constructor() {}

  ngOnInit(): void {}

  removeItem(item: ICartAddon): void {
    this.removeAddonItemEvent.emit(item);
  }
}
