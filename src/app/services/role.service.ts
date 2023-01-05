import { IRole } from '@interfaces/role.interface';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends DataService<IRole> {
  constructor(http: HttpClient) {
    super('admin/roles', http);
  }
}
