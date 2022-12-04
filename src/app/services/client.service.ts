import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { handleError } from '../common/handle-errors';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  protected base_url = environment.base_url;
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http
      .post(`${this.base_url}/client/categories`, {})
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }
}
