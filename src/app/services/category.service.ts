import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/category.interface';
@Injectable({
  providedIn: 'root'
})
export class CategoryService extends DataService<ICategory> {
  constructor(http: HttpClient) {
    super('categories',http);
   }
}
