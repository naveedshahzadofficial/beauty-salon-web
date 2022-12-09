import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '@services/cart.service';
import { IService } from '@interfaces/service.interface';
import { ICartAddon } from '@interfaces/cart-addon.interface';

@Component({
  selector: 'app-addons',
  templateUrl: './addons.component.html',
  styleUrls: ['./addons.component.scss'],
})
export class AddonsComponent implements OnInit {
  @Input() service!: IService;
  @Output() isClosedEvent = new EventEmitter<boolean>();
  addonItems: ICartAddon[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  addonItemEvent(addonItem: ICartAddon) {
    let item = this.addonItems.find(
      (_addonItem) => _addonItem.id === addonItem.id
    );
    let cartAddonItem = this.cartService.isExistAddon(
      this.service.id,
      addonItem
    );
    if (item === undefined && !cartAddonItem) this.addonItems.push(addonItem);
  }

  addToCartAddons() {
    if (this.addonItems.length)
      this.cartService.addToCartAddons(this.service.id, this.addonItems);
    this.addonItems = [];
    this.isClosedEvent.emit(false);
  }

  closedDialog() {
    this.addonItems = [];
    this.isClosedEvent.emit(false);
  }
}
