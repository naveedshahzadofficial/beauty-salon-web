import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { handleError } from '@common/handle-errors';
import { DataService } from '@services/data.service';
import { IUser } from '@app/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends DataService<IUser> {
  constructor(http: HttpClient) {
    super('admin/clients', http);
  }

  getCategories() {
    return this.http
      .post(`${this.base_url}/client/categories`, {})
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }

  getCategoryServices(slug: string) {
    return this.http
      .post(`${this.base_url}/client/categories/${slug}/services`, {})
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }

  getCheckoutPage() {
    return this.http
      .post(`${this.base_url}/client/checkout-page`, {})
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }

  getAddresses() {
    return this.http
      .post(`${this.base_url}/client/addresses`, {})
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }

  addAddress(addressFrom: any) {
    return this.http
      .post(`${this.base_url}/client/address`, addressFrom)
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }

}
