import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { IUser } from '@interfaces/user.interface';
import { handleError } from '@common/handle-errors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected base_url = environment.base_url;
  private readonly CLIENT_TOKEN_NAME = 'access_token';
  private readonly STAFF_TOKEN_NAME = 'staff_access_token';
  private readonly USER_NAME = 'user';
  private readonly STAFF_USER_NAME = 'staff_user';

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private _isStaffLoggedIn$ = new BehaviorSubject<boolean>(false);
  private _user$ = new BehaviorSubject<IUser | null>(null);
  private _staffUser$ = new BehaviorSubject<IUser | null>(null);

  isLoggedIn$ = this._isLoggedIn$.asObservable();
  user$ = this._user$.asObservable();

  isStaffLoggedIn$ = this._isStaffLoggedIn$.asObservable();
  staffUser$ = this._staffUser$.asObservable();

  constructor(private http: HttpClient) {
    this._isLoggedIn$.next(!!this.token);
    this._user$.next(this.user);
    this._isStaffLoggedIn$.next(!!this.staffToken);
    this._staffUser$.next(this.staffUser);
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

  set staffToken(token: string) {
    localStorage.setItem(this.STAFF_TOKEN_NAME, token);
    this._isStaffLoggedIn$.next(true);
  }

  get staffToken(): any {
    return localStorage.getItem(this.STAFF_TOKEN_NAME);
  }

  set user(user: IUser) {
    localStorage.setItem(this.USER_NAME, JSON.stringify(user));
    this._user$.next(user);
  }

  get user(): IUser {
    let auth_user = localStorage.getItem(this.USER_NAME) as string;
    return JSON.parse(auth_user) as IUser;
  }

  set staffUser(user: IUser) {
    localStorage.setItem(this.STAFF_USER_NAME, JSON.stringify(user));
    this._staffUser$.next(user);
  }

  get staffUser(): IUser {
    let auth_user = localStorage.getItem(this.STAFF_USER_NAME) as string;
    return JSON.parse(auth_user) as IUser;
  }

  removeToken() {
    localStorage.removeItem(this.CLIENT_TOKEN_NAME);
    localStorage.removeItem(this.USER_NAME);
    this._isLoggedIn$.next(false);
    this._user$.next(null);
  }

  removeStaffToken() {
    localStorage.removeItem(this.STAFF_TOKEN_NAME);
    localStorage.removeItem(this.STAFF_USER_NAME);
    this._isStaffLoggedIn$.next(false);
    this._staffUser$.next(null);
  }

  logout() {
    return this.http
      .post(`${this.base_url}/logout`, {})
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }

  logoutStaff() {
    return this.http
      .post(`${this.base_url}/admin/logout`, {})
      .pipe(map((response: any) => response.data))
      .pipe(retry(1), catchError(handleError));
  }
}
