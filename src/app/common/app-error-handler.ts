import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { AppError } from './app-error';
import { UnauthorizedError } from './unauthorized-error';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppErrorHandler implements ErrorHandler {
  constructor(private authService: AuthService) {}
  handleError(error: AppError) {
    /* if(error.status === 404){
        //this.form.setErrors(error.json());
        alert("This category has already been deleted.");
      }
      */
    if (error instanceof UnauthorizedError) {
      this.authService.removeToken();
      alert('Your are unauthorized.');
    } else {
      alert('An unexpected error occurred.');
    }
    console.log(error);
  }
}
