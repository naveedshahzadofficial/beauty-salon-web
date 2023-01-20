import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStatus } from '@interfaces/status.interface';
import { DataService } from '@services/data.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService extends DataService<IStatus> {
  constructor(http: HttpClient) {
    super('admin/statuses', http);
  }
}
