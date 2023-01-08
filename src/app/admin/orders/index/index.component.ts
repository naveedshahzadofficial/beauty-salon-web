import { IOrder } from '@interfaces/order.interface';
import { OrderService } from '@services/order.service';
import { debounceTime, distinctUntilChanged, map, switchMap, filter } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IResponse } from '@interfaces/response.interface';
import { IMeta } from '@app/interfaces/meta.interface';
import { ILinks } from '@app/interfaces/links.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class OrderIndexComponent implements OnInit {
  @ViewChild('searchForm') searchForm!: NgForm;
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
    { label: 'Mobile No', name: 'mobile', orderable: true },
    { label: 'Total Price', name: 'total_price', orderable: true },
    { label: 'Created Date', name: 'created_at', orderable: true },
    { label: 'Status', name: 'status', orderable: true },
    { label: 'Actions', name: null },
  ];

  constructor(private orderService: OrderService,
    private toastr: ToastrService,) {
    this.columns.forEach((column: any) => {
      if (column.name != null)
        this.sortOrders[column.name] = -1;
    });
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const formValue = this.searchForm.valueChanges;
    formValue?.pipe(
      map(x => this.tableData.search = x.searchTerm),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(() => this.orderService.setResource("admin/orders").indexPaging(null, this.tableData))
    ).subscribe(resp => {
      this.orders = resp.data;
      this.meta = resp.meta;
      this.links = resp.links;
    });
  }

  loadCollection(paging_url: string | null = null) {
    this.orderService.setResource("admin/orders").indexPaging(paging_url, this.tableData).subscribe(resp => {
      this.orders = resp.data;
      this.meta = resp.meta;
      this.links = resp.links;
    });
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
