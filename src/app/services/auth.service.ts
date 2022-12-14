import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { IUser } from '@interfaces/user.interface';
import { handleError } from '@common/handle-errors';
import { IRole } from '@interfaces/role.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected base_url = environment.base_url;
  private readonly CLIENT_TOKEN_NAME = 'access_token';
  private readonly USER_NAME = 'user';

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private _user$ = new BehaviorSubject<IUser | null>(null);

  isLoggedIn$ = this._isLoggedIn$.asObservable();
  user$ = this._user$.asObservable();

  constructor(private http: HttpClient) {
    this._isLoggedIn$.next(!!this.token);
    this._user$.next(this.user);
  }

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

  set token(token: string) {
    localStorage.setItem(this.CLIENT_TOKEN_NAME, token);
    this._isLoggedIn$.next(true);
  }

  get token(): any {
    return localStorage.getItem(this.CLIENT_TOKEN_NAME);
  }

  set user(user: IUser) {
    localStorage.setItem(this.USER_NAME, JSON.stringify(user));
    this._user$.next(user);
  }

  get user(): IUser {
    let auth_user = localStorage.getItem(this.USER_NAME) as string;
    return JSON.parse(auth_user) as IUser;
  }

  get roles(): IRole[] {
    return this.user.roles ? this.user.roles : [];
  }

  removeToken() {
    localStorage.removeItem(this.CLIENT_TOKEN_NAME);
    localStorage.removeItem(this.USER_NAME);
    this._isLoggedIn$.next(false);
    this._user$.next(null);
  }

  logout() {
    return this.http
      .post(`${this.base_url}/logout`, {})
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }

}
