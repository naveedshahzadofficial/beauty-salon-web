import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AppError } from './app-error';
import { BadInput } from './bad-input';
import { NotFoundError } from './not-found-error';
import { ValidationError } from './validation-error';

export function handleError(error: HttpErrorResponse) {
  if (error.status === 400) return throwError(() => new BadInput());
  if (error.status === 404) return throwError(() => new NotFoundError());
  if (error.status === 422) return throwError(() => new ValidationError(error));
  return throwError(() => new AppError(error));
}
