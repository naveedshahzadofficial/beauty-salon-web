import { Router } from '@angular/router';
import { AppError } from './../../common/app-error';
import { ValidationError } from './../../common/validation-error';
import { AuthService } from './../../services/auth.service';
import { CustomValidator } from './../../common/custom-validator';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  faLongArrowAltRight = faLongArrowAltRight;
  mobileInputMask = createMask('03999999999');

  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ])
    ),
    last_name: new FormControl(
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ])
    ),
    mobile: new FormControl(null, Validators.required),
    password: new FormControl(
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ])
    ),
    password_confirmation: new FormControl(
      null,
      Validators.compose([
        Validators.required,
        this.customValidator.confirmValidator,
      ])
    ),
    term_and_condition: new FormControl(null, Validators.requiredTrue),
  });

  error_messages = {
    first_name: [
      { type: 'required', message: 'Please enter your first name' },
      {
        type: 'minlength',
        message: 'The first name must be at least 3 characters.',
      },
      {
        type: 'maxlength',
        message: 'The first name must not be greater than 25 characters.',
      },
    ],

    last_name: [
      { type: 'required', message: 'Please enter your last name' },
      {
        type: 'minlength',
        message: 'The last name must be at least 3 characters.',
      },
      {
        type: 'maxlength',
        message: 'The last name must not be greater than 25 characters.',
      },
    ],

    mobile: [{ type: 'required', message: 'Please enter your mobile no.' }],

    password: [
      { type: 'required', message: 'Please enter your password.' },
      {
        type: 'minlength',
        message: 'The last name must be at least 3 characters.',
      },
      {
        type: 'maxlength',
        message: 'The last name must not be greater than 30 characters.',
      },
    ],
    password_confirmation: [
      { type: 'required', message: 'Please enter your confirm password.' },
      {
        type: 'confirmed',
        message: 'Password and confirm password should match.',
      },
    ],
    term_and_condition: [
      { type: 'required', message: 'Please accept your term and condition.' },
    ],
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

    this.customValidator.joinMatchField(
      this.registerForm.controls['password'],
      this.registerForm.controls['password_confirmation']
    );
  }

  is_valid(field_name: string): boolean | undefined {
    return (
      this.registerForm.get(field_name)?.invalid &&
      this.registerForm.get(field_name)?.touched
    );
  }

  errorType(field_name: string, type: string = 'required') {
    return this.registerForm.controls[field_name].getError(type);
  }

  onSubmit(e: Event) {
    e.preventDefault();
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) return false;

    this.authService.register(this.registerForm.value).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.registerForm.reset();
        this.authService.setToken(resp.token);
        this.router.navigate(['client/dashboard']);
      },
      error: (e: AppError) => {
        if (e instanceof ValidationError) {
          this.customValidator.extractErrors(
            this.registerForm,
            e.errors,
            this.error_messages
          );
        } else throw e;
      },
    });
    return true;
  }

  ngOnDestroy() {
    this.customValidator.destroySubscribe();
  }
}
