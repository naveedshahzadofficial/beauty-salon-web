import { ICartAddon } from '@interfaces/cart-addon.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAddon } from '@interfaces/addon.interface';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-addon-item',
  templateUrl: './addon-item.component.html',
  styleUrls: ['./addon-item.component.scss'],
})
export class AddonItemComponent implements OnInit {
  @Input() addon!: IAddon;
  @Input() cartItemId!: number;
  @Output() addonItemEvent = new EventEmitter<ICartAddon>();
  cartAddonItem!: ICartAddon;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartAddonItem = {
      id: this.addon.id,
      name: this.addon.addon_title,
      price: this.addon.addon_price,
      quantity: 1,
    };
  }

  addToCart(cartAddonItem: ICartAddon) {
    this.addonItemEvent.emit(cartAddonItem);
  }

  isCartAddonItem(cartAddonItem: ICartAddon) {
    return this.cartService.isExistAddon(this.cartItemId, cartAddonItem);
  }
}
