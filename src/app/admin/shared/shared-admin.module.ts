import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTableComponent } from '@app/admin/shared/base-table/base-table.component';
import { PaginationComponent } from '@app/admin/shared/pagination/pagination.component';
import { DeleteModalComponent } from '@app/admin/shared/delete-modal/delete-modal.component';


@NgModule({
  declarations: [
    BaseTableComponent,
    PaginationComponent,
    DeleteModalComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BaseTableComponent,
    PaginationComponent,
    DeleteModalComponent,
  ]
})
export class SharedAdminModule { }
