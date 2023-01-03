import { Injectable } from '@angular/core';
import { AuthService } from '@services/auth.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const isAdmin = request.url.startsWith(environment.base_url + '/admin');
    console.log(isAdmin);
    if (isAdmin) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.staffToken}`,
        },
      });
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
