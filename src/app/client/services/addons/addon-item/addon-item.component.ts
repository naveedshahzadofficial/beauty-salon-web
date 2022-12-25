import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAddon } from '@interfaces/addon.interface';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-addon-item',
  templateUrl: './addon-item.component.html',
  styleUrls: ['./addon-item.component.scss'],
})
export class AddonItemComponent implements OnInit {
  @Input() addonItem!: IAddon;
  @Input() serviceId!: number;
  @Output() addonItemEvent = new EventEmitter<IAddon>();

  constructor(private cartService: CartService) { }

  ngOnInit(): void { }

  addToCart() {
    this.addonItemEvent.emit(this.addonItem);
  }

  isCartAddonItem() {
    return this.cartService.isExistAddon(this.serviceId, this.addonItem.id);
  }
}
