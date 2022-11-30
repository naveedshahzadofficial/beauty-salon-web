import { AppError } from './../../common/app-error';
import { ValidationError } from './../../common/validation-error';
import { AuthService } from './../../services/auth.service';
import {
  confirmValidator,
  destroySubscribe,
} from './../../common/custom-validators';
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
      Validators.compose([Validators.required, confirmValidator])
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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

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
        //this.is_submitted = true;
      },
      error: (e: AppError) => {
        if (e instanceof ValidationError) {
          console.log(e.errors);
          for (let field_name of Object.keys(e.errors)) {
            this.registerForm.controls[field_name].setErrors({
              custom: true,
            });

            let field_obj =
              this.error_messages[
                field_name as keyof typeof this.error_messages
              ];
            let result = field_obj.filter((key) => key.type === 'custom');
            if (result.length) {
              result[0].message = e.errors[field_name][0];
            } else {
              field_obj.push({
                type: 'custom',
                message: e.errors[field_name][0],
              });
            }
          }

          // this.registerForm.setErrors(e.errors);
        } else throw e;
      },
    });
    return true;
  }

  ngOnDestroy() {
    destroySubscribe();
  }
}
