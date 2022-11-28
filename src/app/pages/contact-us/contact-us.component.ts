import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  map_url: string = "https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed";
  
  contactUsForm: FormGroup = new FormGroup({
    'full_name': new FormControl(null, Validators.required),
    'issue_nature': new FormControl(null, Validators.required),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'mobile_no': new FormControl(null, Validators.required),
    'subject': new FormControl(null, Validators.required),
    'message': new FormControl(null, Validators.required),
    'communication_mode': new FormControl(null, Validators.required),
    'is_copy': new FormControl(null, Validators.required),

  });
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.contactUsForm);
    return false;
  }

}
