import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { ToastrService } from 'ngx-toastr';
import { CustomValidator } from '@common/custom-validator';

@Component({
  selector: 'app-staff-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class StaffCreateComponent implements OnInit {

  mobileInputMask = createMask('03999999999');
  public staffForm!: FormGroup;

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
    email: [{ type: 'email', message: 'Please enter your valid email.' }],
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
    role_id: [{ type: 'required', message: 'Please select the role.' }],

  };

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidator,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {

  }

  private createForm(): void {
    this.staffForm = this.fb.group({
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
      email: new FormControl(null, Validators.compose([Validators.nullValidator, Validators.email])),
      password: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ])
      ),
      role_id: new FormControl(null, Validators.required),
    });
  }

  is_valid(field_name: string): boolean | undefined {
    return this.customValidator.is_valid(this.staffForm, field_name);
  }
  errorType(field_name: string, type: string = 'required') {
    return this.customValidator.errorType(this.staffForm, field_name, type);
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.staffForm.invalid) {
      Object.keys(this.staffForm.controls).forEach(field => {
        const control = this.staffForm.get(field);
        if (control)
          control.markAsTouched({ onlySelf: true });
      });
      return;
    };

    console.log(this.staffForm.value);

    this.toastr.success('Your Staff has been added successfully!', 'Success!');


  }

}
