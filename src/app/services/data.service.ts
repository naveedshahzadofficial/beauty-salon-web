import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IResponses } from '@interfaces/responses.interface';
import { IResponse } from '@interfaces/response.interface';
import { handleError } from '@common/handle-errors';
import { IPagination } from '@interfaces/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService<T> {
  protected base_url = environment.base_url;
  constructor(protected resource: String, protected http: HttpClient) { }
  setResource(resource: String) {
    this.resource = resource;
    return this;
  }
  getAll(): Observable<IResponses<T>> {
    return this.http
      .get<IResponses<T>>(`${this.base_url}/${this.resource}`)
      .pipe(retry(1), catchError(handleError));
  }

  indexPaging(paging_url: string | null, table_data: object): Observable<IPagination<T>> {
    if (paging_url === null)
      paging_url = `${this.base_url}/${this.resource}/index-paging`;
    return this.http
      .post<IPagination<T>>(paging_url, table_data)
      .pipe(retry(1), catchError(handleError));
  }

  store(formData: any): Observable<IResponse<T>> {
    return this.http
      .post<IResponse<T>>(
        `${this.base_url}/${this.resource}`, formData)
      .pipe(retry(1), catchError(handleError));
  }

  show(id: any): Observable<IResponse<T>> {
    return this.http
      .get<IResponse<T>>(`${this.base_url}/${this.resource}/${id}`)
      .pipe(retry(1), catchError(handleError));
  }

  update(formData: any, id: any): Observable<IResponse<T>> {
    return this.http
      .patch<IResponse<T>>(
        `${this.base_url}/${this.resource}/${id}`, formData)
      .pipe(retry(1), catchError(handleError));
  }

  destroy(id: any): Observable<IResponse<T>> {
    return this.http
      .delete<IResponse<T>>(`${this.base_url}/${this.resource}/${id}`)
      .pipe(retry(1), catchError(handleError));
  }
}
