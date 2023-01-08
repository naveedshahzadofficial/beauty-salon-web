import { Component, OnInit } from '@angular/core';
import { OrderService } from '@services/order.service';
import { IOrder } from '@interfaces/order.interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class OrderShowComponent implements OnInit {
  order!: IOrder;
  constructor(private orderService: OrderService, private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getOrder();
  }

  private getOrder() {
    this.route.params.pipe(
      switchMap((resp: any) => this.orderService.getRecipient(resp.id)),
    ).subscribe((resp: IOrder) => {
      this.order = resp;
    });
  }

}
