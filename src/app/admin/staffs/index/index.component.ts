import { IUser } from '@interfaces/user.interface';
import { StaffService } from '@services/staff.service';
import { Component, OnInit } from '@angular/core';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-staff-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class StaffIndexComponent implements OnInit {
  message: string = '';
  sortOrders: any = {};
  sortKey = 'created_at';

  staffs: IUser[] = [];

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



  constructor(private staffService: StaffService) {
    this.columns.forEach((column: any) => {
      if (column.name != null)
        this.sortOrders[column.name] = -1;
    });
  }

  ngOnInit(): void {
    this.loadCollection();
  }

  loadCollection() {
    this.staffService.getAll().subscribe(resp => this.staffs = resp.data);
  }

  confirmDelete(user_id: number) {

  }

}
