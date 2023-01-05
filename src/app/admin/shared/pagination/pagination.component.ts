import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ILinks } from '@interfaces/links.interface';
import { IMeta } from '@interfaces/meta.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() meta = {} as IMeta;
  @Input() links = {} as ILinks;
  @Output() pageChangeEvent = new EventEmitter<string>;

  constructor() { }

  ngOnInit(): void {
  }

}
