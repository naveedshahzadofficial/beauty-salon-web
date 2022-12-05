import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '@interfaces/category.interface';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root',
})
export class CategoryService extends DataService<ICategory> {
  constructor(http: HttpClient) {
    super('categories', http);
  }
}
