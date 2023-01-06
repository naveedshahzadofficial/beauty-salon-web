import { ErrorHandler, Injectable } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { AppError } from './app-error';
import { UnauthorizedError } from './unauthorized-error';
import { NotFoundError } from './not-found-error';

@Injectable({
  providedIn: 'root',
})
export class AppErrorHandler implements ErrorHandler {
  constructor(private authService: AuthService) { }
  handleError(error: AppError) {
    if (error instanceof UnauthorizedError) {
      this.authService.removeToken();
      alert('Your are unauthorized.');
    } else if (error instanceof NotFoundError) {
      alert('Your Record is not found.');
    } else {
      alert('An unexpected error occurred.');
    }
    console.log(error);
  }
}
