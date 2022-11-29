import { confirmValidator } from 'src/app/common/custom-validators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  faLongArrowAltRight = faLongArrowAltRight;
  mobileInputMask = createMask('03999999999');

  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(
      null,
      Validators.compose([Validators.required, Validators.minLength(3)])
    ),
    last_name: new FormControl(null, Validators.required),
    mobile_no: new FormControl(null, Validators.required),
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

  constructor() {}

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
    console.log(this.registerForm);
  }
}
