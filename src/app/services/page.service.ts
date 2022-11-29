import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { handleError } from '../common/handle-errors';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  protected base_url = environment.base_url;
  constructor(private http: HttpClient) {}

  homePage(): Observable<any> {
    return this.http
      .post(`${this.base_url}/pages/home`, {})
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }

  servicesPage(): Observable<any> {
    return this.http
      .post(`${this.base_url}/pages/services`, {})
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }

  storiesPage(per_page: number, page: number): Observable<any> {
    return this.http
      .post(`${this.base_url}/pages/stories`, {
        per_page: per_page,
        page: page,
      })
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }

  contactUsForm(contact_us_form: any): Observable<any> {
    return this.http
      .post(`${this.base_url}/pages/contact-us-form`, contact_us_form)
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }
}
