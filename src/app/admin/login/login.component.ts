import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { createMask } from '@ngneat/input-mask';
import { AuthService } from '@services/auth.service';
import { UnauthorizedError } from '@common/unauthorized-error';
import { CustomValidator } from '@common/custom-validator';
import { ValidationError } from '@common/validation-error';
import { AppError } from '@common/app-error';

import { Router } from '@angular/router';
import { IUser } from '@interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  mobileInputMask = createMask('03999999999');
  error_unauthenticated = false;
  loginForm!: FormGroup;
  subscription!: Subscription;


  error_messages = {
    mobile: [{ type: 'required', message: 'Please enter your mobile no.' }],
    password: [{ type: 'required', message: 'Please enter your password.' }],
  };

  constructor(private fb: FormBuilder, private authService: AuthService,
    private customValidator: CustomValidator,
    private router: Router) {
    this.loginFormBuild();
  }

  ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn$.subscribe((resp: boolean) => {
      if (resp)
        this.router.navigate(['admin/dashboard']);
    });
  }

  ngAfterViewInit(): void {
    document.body.classList.remove('main');
    document.body.classList.add('login');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('login');
    document.body.classList.add('main');
    this.subscription.unsubscribe();
  }

  private loginFormBuild(): void {
    this.loginForm = this.fb.group({
      mobile: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      remember_me: new FormControl(null, Validators.nullValidator),
    });
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
        this.authService.token = resp.token;
        this.authService.user = resp.user as IUser;
        this.router.navigate(['admin/dashboard']);
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
