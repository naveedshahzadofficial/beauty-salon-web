import { Component, OnInit } from '@angular/core';
import { OrderService } from '@services/order.service';
import { SharedService } from '@services/shared.service';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.scss']
})
export class RecipientComponent implements OnInit {

  constructor(
    private sharedService: SharedService,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
  }

}
