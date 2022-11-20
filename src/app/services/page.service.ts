import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from './../common/not-found-error';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  protected base_url = environment.base_url;
  constructor(private http: HttpClient) { }

  homePage(): Observable<any>{
    return this.http.get(`${this.base_url}/pages/home`)
    .pipe(map((response: any) => response.data))
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
