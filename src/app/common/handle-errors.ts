import { UnauthorizedError } from './unauthorized-error';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AppError } from './app-error';
import { BadInput } from './bad-input';
import { NotFoundError } from './not-found-error';
import { ValidationError } from './validation-error';

export function handleError(error: HttpErrorResponse) {
  if (error.status === 400)
    return throwError(() => new BadInput(error.error.errors));
  if (error.status === 403)
    return throwError(() => new UnauthorizedError(error.error));
  if (error.status === 404)
    return throwError(() => new NotFoundError(error.error.errors));
  if (error.status === 422)
    return throwError(() => new ValidationError(error.error.errors));

  return throwError(() => new AppError(error));
}
