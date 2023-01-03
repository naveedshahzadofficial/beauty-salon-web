import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-staff-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class StaffIndexComponent implements OnInit, AfterViewInit {
  message: string = '';
  sortOrders: any = {};
  sortKey = 'created_at';

  perPage = ['30', '50', '100', '200', '500', '1000', 'All'];
  tableData = {
    draw: 0,
    length: 30,
    search: '',
    column: 'created_at',
    dir: 'desc',
  };

  columns = [
    { label: 'First Name', name: 'first_name', orderable: true },
    { label: 'Last Name', name: 'last_name', orderable: true },
    { label: 'Mobile No', name: 'mobile', orderable: true },
    { label: 'Status', name: 'is_active', orderable: true },
    { label: 'Created Date', name: 'created_at', orderable: true },
    { label: 'Actions', name: null },
  ];



  constructor() {
    this.columns.forEach((column: any) => {
      if (column.name != null)
        this.sortOrders[column.name] = -1;
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  loadCollection() {

  }

}
