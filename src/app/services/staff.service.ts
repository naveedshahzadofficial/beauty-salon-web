import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { IUser } from '@app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class StaffService extends DataService<IUser> {
  constructor(http: HttpClient) {
    super('admin/staffs', http);
  }
}
