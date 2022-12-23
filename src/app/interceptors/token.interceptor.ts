import { Injectable } from '@angular/core';
import { AuthService } from '@services/auth.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    if (this.authService.isLoggedIn$) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
