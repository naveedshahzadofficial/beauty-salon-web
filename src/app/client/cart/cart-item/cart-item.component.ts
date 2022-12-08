import { IService } from '@interfaces/service.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() service!: IService;
  @Output() removeItemEvent = new EventEmitter<IService>();

  constructor() {}

  ngOnInit(): void {}

  removeItem(item: IService): void {
    this.removeItemEvent.emit(item);
  }
}
