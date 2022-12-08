import { IAddon } from '@interfaces/addon.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-addons',
  templateUrl: './addons.component.html',
  styleUrls: ['./addons.component.scss'],
})
export class AddonsComponent implements OnInit {
  @Input() addons: IAddon[] | undefined = [];
  @Output() isClosedEvent = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}
}
