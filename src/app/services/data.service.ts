import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IResponses } from '@interfaces/responses.interface';
import { IResponse } from '@interfaces/response.interface';
import { handleError } from '@common/handle-errors';

@Injectable({
  providedIn: 'root',
})
export class DataService<T> {
  protected base_url = environment.base_url;
  constructor(protected resource: String, protected http: HttpClient) { }

  getAll(): Observable<IResponses<T>> {
    return this.http
      .get<IResponses<T>>(`${this.base_url}/${this.resource}`)
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

  update(formData: any): Observable<IResponse<T>> {
    return this.http
      .patch<IResponse<T>>(
        `${this.base_url}/${this.resource}/${formData.id}`, formData)
      .pipe(retry(1), catchError(handleError));
  }

  destroy(id: any): Observable<IResponse<T>> {
    return this.http
      .delete<IResponse<T>>(`${this.base_url}/${this.resource}/${id}`)
      .pipe(retry(1), catchError(handleError));
  }
}
