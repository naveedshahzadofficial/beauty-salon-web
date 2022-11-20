import { Injectable } from '@angular/core';
import { NotFoundError } from './../common/not-found-error';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { IResponses } from '../interfaces/responses.interface';
import { IResponse } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService<T> {
  protected base_url = environment.base_url;
  constructor(protected resource: String, protected http: HttpClient) { }

  getAll(): Observable<IResponses<T>>{
    return this.http.get<IResponses<T>>(`${this.base_url}/${this.resource}`)
    .pipe(retry(1), catchError(this.handleError));
  }

  store(model: any): Observable<IResponse<T>>{
     return this.http.post<IResponse<T>>(`${this.base_url}/${this.resource}`, JSON.stringify(model))
     .pipe(retry(1), catchError(this.handleError));
  }

  show(id: T): Observable<IResponse<T>>{
     return this.http.get<IResponse<T>>(`${this.base_url}/${this.resource}/${id}`)
     .pipe(retry(1), catchError(this.handleError));
  }

  update(model: any): Observable<IResponse<T>>{
     return this.http.patch<IResponse<T>>(`${this.base_url}/${this.resource}/${model.id}`, JSON.stringify(model))
     .pipe(retry(1), catchError(this.handleError));
  }

  destroy(id: any): Observable<IResponse<T>>{
     return this.http.delete<IResponse<T>>(`${this.base_url}/${this.resource}/${id}`)
     .pipe(retry(1), catchError(this.handleError));
  }

  protected handleError(error:HttpErrorResponse) {
    if(error.status === 400)
      return throwError(() => new BadInput());

    if(error.status === 404)
      return throwError(() => new NotFoundError());

    return throwError(() => new AppError(error));
  }

}
