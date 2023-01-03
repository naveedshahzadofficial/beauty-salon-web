import { IUser } from './../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService<IUser> {
  constructor(http: HttpClient) {
    super('admin/users', http);
  }
}

