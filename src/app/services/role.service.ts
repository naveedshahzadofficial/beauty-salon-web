import { IRole } from '@interfaces/role.interface';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { handleError } from '@common/handle-errors';
import { catchError, map, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends DataService<IRole> {
  constructor(http: HttpClient) {
    super('admin/roles', http);
  }

  getRoles(type: string = 'staff') {
    return this.http
      .post(`${this.base_url}/admin/roles/get-roles/${type}`, {})
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }
}
