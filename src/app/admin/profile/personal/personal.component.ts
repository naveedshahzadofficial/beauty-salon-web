import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '@interfaces/user.interface';
import { createMask } from '@ngneat/input-mask';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  mobileInputMask = createMask('03999999999');

  user = {} as IUser | null;
  profileForm!: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.authService.user$.subscribe(user => {
      this.user = user;
      console.log(this.user);
      this.setFormValues();
    });
  }

  private createForm(): void {
    this.profileForm = this.fb.group({
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
      gender: new FormControl(
        null,
        Validators.required
      ),
      dob: new FormControl(
        null,
        Validators.required
      ),
      cnic: new FormControl(
        null,
        Validators.required
      ),
    });
  }

  private setFormValues() {
    if (this.user)
      this.profileForm.patchValue(this.user)
  }

  onSubmit(event: any) {

  }

}
