import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(){
    return this.http.get<any>('http://beauty-salon.test/api/v1/categories');
  }
}
