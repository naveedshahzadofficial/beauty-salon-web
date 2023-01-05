import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { ToastrService } from 'ngx-toastr';
import { StaffService } from '@services/staff.service';
import { RoleService } from '@services/role.service';
import { IUser } from '@interfaces/user.interface';
import { IResponses } from '@interfaces/responses.interface';
import { IRole } from '@interfaces/role.interface';
import { IResponse } from '@interfaces/response.interface';
import { CustomValidator } from '@common/custom-validator';
import { AppError } from '@app/common/app-error';
import { ValidationError } from '@app/common/validation-error';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class StaffEditComponent implements OnInit {

  mobileInputMask = createMask('03999999999');
  staffForm!: FormGroup;
  staff = {} as IUser;
  roles: IRole[] = [];

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
        message: 'The last name must be at least 6 characters.',
      },
      {
        type: 'maxlength',
        message: 'The last name must not be greater than 30 characters.',
      },
    ],
    role_id: [{ type: 'required', message: 'Please select the role.' }],
    is_active: [{ type: 'required', message: 'Please select the status.' }],

  };

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidator,
    private roleService: RoleService,
    private staffService: StaffService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getStaff();
    this.getRoles();
  }

  private getStaff() {
    this.route.params.pipe(
      switchMap((resp: any) => this.staffService.show(resp.id)),
    ).subscribe((resp: IResponse<IUser>) => {
      this.staff = resp.data;
      this.setFormValues();

    });
  }

  private setFormValues() {
    this.staffForm.patchValue(this.staff)
    let role_id = this.staff.roles ? this.staff.roles[0].id : null;
    this.staffForm.patchValue({
      is_active: this.staff.status == 'Active' ? '1' : '0',
      role_id: role_id
    })
  }

  private getRoles() {
    this.roleService.getAll().subscribe((resp: IResponses<IRole>) => this.roles = resp.data);
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
          Validators.nullValidator,
          Validators.minLength(6),
          Validators.maxLength(30),
        ])
      ),
      role_id: new FormControl(null, Validators.required),
      is_active: new FormControl(null, Validators.required),
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

    this.staffService.update(this.staffForm.value, this.staff.id).subscribe({
      next: (resp: IResponse<IUser>) => {
        this.staffForm.reset();
        this.toastr.success(resp.message, 'Success!');
        this.router.navigate(['admin/staffs/index']);
      },
      error: (e: AppError) => {
        if (e instanceof ValidationError) {
          this.customValidator.extractErrors(
            this.staffForm,
            e.errors,
            this.error_messages
          );
        } else throw e;
      },
    });

  }

}
