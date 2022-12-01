import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { handleError } from '../common/handle-errors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected base_url = environment.base_url;
  constructor(private http: HttpClient) {}

  register(register_form: any): Observable<any> {
    return this.http
      .post(`${this.base_url}/register`, register_form)
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }

  login(login_form: any) {
    return this.http
      .post(`${this.base_url}/login`, login_form)
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }
}
