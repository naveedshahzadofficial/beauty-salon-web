import { UnauthorizedError } from './../../common/unauthorized-error';
import { CustomValidator } from './../../common/custom-validator';
import { ValidationError } from './../../common/validation-error';
import { AppError } from './../../common/app-error';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { createMask } from '@ngneat/input-mask';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  faLongArrowAltRight = faLongArrowAltRight;

  mobileInputMask = createMask('03999999999');
  error_unauthenticated = false;

  loginForm: FormGroup = new FormGroup({
    mobile: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    remember_me: new FormControl(null, Validators.nullValidator),
  });

  error_messages = {
    mobile: [{ type: 'required', message: 'Please enter your mobile no.' }],
    password: [{ type: 'required', message: 'Please enter your password.' }],
  };

  constructor(
    private authService: AuthService,
    private customValidator: CustomValidator,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['client/dashboard']);
    }
  }

  is_valid(field_name: string): boolean | undefined {
    return this.customValidator.is_valid(this.loginForm, field_name);
  }
  errorType(field_name: string, type: string = 'required') {
    return this.customValidator.errorType(this.loginForm, field_name, type);
  }

  onSubmit(e: Event) {
    e.preventDefault();
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) return false;

    this.authService.login(this.loginForm.value).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.loginForm.reset();
        this.authService.setToken(resp.token);
        this.router.navigate(['client/dashboard']);
      },
      error: (e: AppError) => {
        if (e instanceof ValidationError) {
          this.customValidator.extractErrors(
            this.loginForm,
            e.errors,
            this.error_messages
          );
        } else if (e instanceof UnauthorizedError) {
          this.error_unauthenticated = true;
        } else throw e;
      },
    });

    return true;
  }
}
