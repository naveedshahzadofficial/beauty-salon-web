import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  faLongArrowAltRight = faLongArrowAltRight;

  registerForm: FormGroup = new FormGroup({
    'first_name': new FormControl(null, Validators.required),
    'last_name': new FormControl(null, Validators.required),
    'mobile_no': new FormControl(null, Validators.required),
    'password': new FormControl(null, Validators.required),
    'password_confirmation': new FormControl(null, Validators.required),
    'term_and_condition': new FormControl(null, Validators.required),

  });

  constructor() { }

  ngOnInit(): void {
  }

  is_valid(field_name: string): boolean | undefined {
    return this.registerForm.get(field_name)?.invalid && this.registerForm.get(field_name)?.touched;
  }

  onSubmit(){
    console.log(this.registerForm.value)
  }

}
