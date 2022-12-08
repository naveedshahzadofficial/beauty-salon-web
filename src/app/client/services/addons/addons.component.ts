import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-addons',
  templateUrl: './addons.component.html',
  styleUrls: ['./addons.component.scss'],
})
export class AddonsComponent implements OnInit {
  @Output() isClosedEvent = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}
}
