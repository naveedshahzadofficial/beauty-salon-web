import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createMask } from '@ngneat/input-mask';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '@services/role.service';
import { IUser } from '@interfaces/user.interface';
import { IRole } from '@interfaces/role.interface';
import { IResponse } from '@interfaces/response.interface';
import { CustomValidator } from '@common/custom-validator';
import { AppError } from '@common/app-error';
import { ValidationError } from '@app/common/validation-error';
import { switchMap } from 'rxjs';
import { ClientService } from '@services/client.service';
@Component({
  selector: 'app-client-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class ClientEditComponent implements OnInit {
  mobileInputMask = createMask('03999999999');
  clientForm!: FormGroup;
  client = {} as IUser;
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
    private clientService: ClientService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getRoles();
    this.getClient();
  }

  private getClient() {
    this.route.params.pipe(
      switchMap((resp: any) => this.clientService.show(resp.id)),
    ).subscribe((resp: IResponse<IUser>) => {
      this.client = resp.data;
      this.setFormValues();
    });
  }

  private setFormValues() {
    this.clientForm.patchValue(this.client)
    let role_id = this.client.roles ? this.client.roles[0].id : null;
    this.clientForm.patchValue({
      is_active: this.client.status == 'Active' ? '1' : '0',
      role_id: role_id
    })
  }

  private getRoles() {
    this.roleService.getRoles('client').subscribe((roles: IRole[]) => this.roles = roles);
  }

  private createForm(): void {
    this.clientForm = this.fb.group({
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
    return this.customValidator.is_valid(this.clientForm, field_name);
  }
  errorType(field_name: string, type: string = 'required') {
    return this.customValidator.errorType(this.clientForm, field_name, type);
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.clientForm.invalid) {
      Object.keys(this.clientForm.controls).forEach(field => {
        const control = this.clientForm.get(field);
        if (control)
          control.markAsTouched({ onlySelf: true });
      });
      return;
    };

    this.clientService.update(this.clientForm.value, this.client.id).subscribe({
      next: (resp: IResponse<IUser>) => {
        this.clientForm.reset();
        this.toastr.success(resp.message, 'Success!');
        this.router.navigate(['admin/clients/index']);
      },
      error: (e: AppError) => {
        if (e instanceof ValidationError) {
          this.customValidator.extractErrors(
            this.clientForm,
            e.errors,
            this.error_messages
          );
        } else throw e;
      },
    });

  }


}
