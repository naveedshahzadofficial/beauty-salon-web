import { ICartAddon } from '@interfaces/cart-addon.interface';
import { Component, Input, OnInit } from '@angular/core';
import { IAddon } from '@interfaces/addon.interface';

@Component({
  selector: 'app-addon-item',
  templateUrl: './addon-item.component.html',
  styleUrls: ['./addon-item.component.scss'],
})
export class AddonItemComponent implements OnInit {
  @Input() addon!: IAddon;
  cartAddonItem!: ICartAddon;
  constructor() {}

  ngOnInit(): void {
    this.cartAddonItem = {
      id: this.addon.id,
      name: this.addon.addon_title,
      price: this.addon.addon_price,
      quantity: 1,
    };
  }
}
