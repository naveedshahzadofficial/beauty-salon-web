import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '@interfaces/user.interface';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IResponse } from '@interfaces/response.interface';
import { IMeta } from '@app/interfaces/meta.interface';
import { ILinks } from '@app/interfaces/links.interface';
import { NgForm } from '@angular/forms';
import { ClientService } from '@services/client.service';

@Component({
  selector: 'app-client-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class ClientIndexComponent implements OnInit, AfterViewInit {

  @ViewChild('searchForm') searchForm!: NgForm;
  isShowModel: boolean = false;
  deletingId: number = 0;
  sortOrders: any = {};
  sortKey = 'created_at';
  meta = {} as IMeta;
  links = {} as ILinks;
  clients: IUser[] = [];
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

  constructor(private clientService: ClientService,
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
      switchMap(() => this.clientService.indexPaging(null, this.tableData))
    ).subscribe(resp => {
      this.clients = resp.data;
      this.meta = resp.meta;
      this.links = resp.links;
    });
  }

  loadCollection(paging_url: string | null = null) {
    this.clientService.indexPaging(paging_url, this.tableData).subscribe(resp => {
      this.clients = resp.data;
      this.meta = resp.meta;
      this.links = resp.links;
    });
  }

  confirmDelete(client_id: number) {
    this.deletingId = client_id;
    this.isShowModel = true;
  }

  confirmEvent(confirmed: boolean) {
    if (confirmed) {
      this.clientService.destroy(this.deletingId).subscribe((resp: IResponse<IUser>) => {
        this.toastr.success(resp.message, 'Success!');
        this.clients = this.clients.filter(client => client.id !== this.deletingId);
        this.isShowModel = false;
        this.deletingId = 0;
      })
    } else {
      this.isShowModel = false;
      this.deletingId = 0;
    }

  }


}
