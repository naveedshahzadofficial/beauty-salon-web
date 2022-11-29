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
  errors: any;

  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(
      null,
      Validators.compose([Validators.required, Validators.minLength(3)])
    ),
    last_name: new FormControl(null, Validators.required),
    mobile: new FormControl(null, Validators.required),
    password: new FormControl(
      null,
      Validators.compose([Validators.required, Validators.minLength(6)])
    ),
    password_confirmation: new FormControl(
      null,
      Validators.compose([Validators.required, confirmValidator])
    ),
    term_and_condition: new FormControl(null, Validators.requiredTrue),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log(this.errors);
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
        this.registerForm.reset();
        this.errors = undefined;
        //this.is_submitted = true;
      },
      error: (e: any) => {
        if (e instanceof ValidationError) {
          this.errors = e.originalError.error.errors;
          console.log(this.errors);
        }
      },
    });
    return true;
  }

  ngOnDestroy() {
    destroySubscribe();
  }
}
