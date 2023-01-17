import { IOrder } from '@interfaces/order.interface';
import { OrderService } from '@services/order.service';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { IResponse } from '@interfaces/response.interface';
import { IMeta } from '@app/interfaces/meta.interface';
import { ILinks } from '@app/interfaces/links.interface';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class OrderIndexComponent implements OnInit {
  isShowModel: boolean = false;
  deletingId: number = 0;
  sortOrders: any = {};
  sortKey = 'order_date';
  meta = {} as IMeta;
  links = {} as ILinks;
  orders: IOrder[] = [];
  perPage = ['30', '50', '100', '200', '500', '1000', 'All'];
  tableData = {
    draw: 0,
    length: 30,
    search: '',
    column: 'order_date',
    dir: 'desc',
  };
  columns = [
    { label: 'Order No.', name: 'order_no', orderable: true },
    { label: 'Order Date', name: 'order_date', orderable: true },
    { label: 'Order Time', name: 'order_time', orderable: true },
    { label: 'Mobile No', name: 'phone', orderable: true },
    { label: 'Total Price', name: 'total_price', orderable: true },
    { label: 'Created Date', name: 'created_at', orderable: true },
    { label: 'Status', name: 'status', orderable: true },
    { label: 'Actions', name: null },
  ];

  constructor(private orderService: OrderService,
    private toastr: ToastrService, private spinner: NgxSpinnerService) {
    this.columns.forEach((column: any) => {
      if (column.name != null)
        this.sortOrders[column.name] = -1;
    });
    this.loadCollection();
  }

  ngOnInit(): void {
  }

  loadCollection(paging_url: string | null = null) {
    this.spinner.show();
    this.orderService.setResource("admin/orders").indexPaging(paging_url, this.tableData).pipe(
      tap(() => this.spinner.hide())
    ).subscribe(resp => {
      this.orders = resp.data;
      this.meta = resp.meta;
      this.links = resp.links;
    });
  }

  sortBy(key: string) {
    this.sortKey = key;
    this.sortOrders[key] = this.sortOrders[key] * -1;
    this.tableData.column = key;
    this.tableData.dir = this.sortOrders[key] === 1 ? 'asc' : 'desc';
    this.loadCollection();
  }

  confirmDelete(staff_id: number) {
    this.deletingId = staff_id;
    this.isShowModel = true;
  }

  confirmEvent(confirmed: boolean) {
    if (confirmed) {
      this.orderService.destroy(this.deletingId).subscribe((resp: IResponse<IOrder>) => {
        this.toastr.success(resp.message, 'Success!');
        this.orders = this.orders.filter(row => row.id !== this.deletingId);
        this.isShowModel = false;
        this.deletingId = 0;
      })
    } else {
      this.isShowModel = false;
      this.deletingId = 0;
    }

  }
}
