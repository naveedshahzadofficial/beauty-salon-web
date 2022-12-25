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
  @Output() changedAddonQtyEvent = new EventEmitter<ICartAddon>();
  range: number[] = [];
  constructor() { }

  ngOnInit(): void {
    for (let i = 1; i <= 10; i++) {
      this.range.push(i);
    }
  }

  removeItem(item: ICartAddon): void {
    this.removeAddonItemEvent.emit(item);
  }

}
