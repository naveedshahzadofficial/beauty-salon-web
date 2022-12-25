import { IAddon } from '@interfaces/addon.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '@services/cart.service';
import { IService } from '@interfaces/service.interface';

@Component({
  selector: 'app-addons',
  templateUrl: './addons.component.html',
  styleUrls: ['./addons.component.scss'],
})
export class AddonsComponent implements OnInit {
  @Input() service!: IService;
  @Output() isClosedEvent = new EventEmitter<boolean>();
  addonItems: any[] = [];
  constructor(private cartService: CartService) { }

  ngOnInit(): void { }

  addonItemEvent(addonItem: IAddon) {

    let cartAddonItem = Object.assign({}, { service_id: this.service.id, addon_id: addonItem.id, name: addonItem.addon_title, price: addonItem.addon_price, quantity: 1, is_same_time: true });

    let item = this.addonItems.find(
      (_addonItem) => _addonItem.addon_id === addonItem.id
    );

    let isExistAddonCart = this.cartService.isExistAddon(
      this.service.id,
      addonItem.id
    );
    if (item === undefined && !isExistAddonCart) this.addonItems.push(cartAddonItem);
  }

  addToCartAddons() {
    console.log(this.addonItems);
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
