import { ToastrService } from 'ngx-toastr';
import { IUser } from '@interfaces/user.interface';
import { StaffService } from '@services/staff.service';
import { Component, OnInit } from '@angular/core';
import { IResponse } from '@interfaces/response.interface';
import { IMeta } from '@app/interfaces/meta.interface';
import { ILinks } from '@app/interfaces/links.interface';

@Component({
  selector: 'app-staff-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class StaffIndexComponent implements OnInit {
  isShowModel: boolean = false;
  deletingId: number = 0;
  sortOrders: any = {};
  sortKey = 'created_at';
  meta = {} as IMeta;
  links = {} as ILinks;

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
    { label: 'Role', name: 'role_id', orderable: false },
    { label: 'Created Date', name: 'created_at', orderable: true },
    { label: 'Status', name: 'is_active', orderable: true },
    { label: 'Actions', name: null },
  ];



  constructor(private staffService: StaffService,
    private toastr: ToastrService,) {
    this.columns.forEach((column: any) => {
      if (column.name != null)
        this.sortOrders[column.name] = -1;
    });
  }

  ngOnInit(): void {
    this.loadCollection(null);
  }


  loadCollection(paging_url: string | null = null) {
    this.staffService.indexPaging(paging_url, this.tableData).subscribe(resp => {
      this.staffs = resp.data;
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
      this.staffService.destroy(this.deletingId).subscribe((resp: IResponse<IUser>) => {
        this.toastr.success(resp.message, 'Success!');
        this.staffs = this.staffs.filter(staff => staff.id !== this.deletingId);
        this.isShowModel = false;
        this.deletingId = 0;
      })
    } else {
      this.isShowModel = false;
      this.deletingId = 0;
    }

  }

}
