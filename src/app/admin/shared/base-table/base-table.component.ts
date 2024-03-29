import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss']
})
export class BaseTableComponent implements OnInit {
  @Input() columns: any = [];
  @Input() childColumns: any = [];
  @Input() sortKey: string = '';
  @Input() sortOrders = [];
  @Output() sortBy: EventEmitter<string> = new EventEmitter<string>;
  constructor() { }

  ngOnInit(): void {
  }

}
