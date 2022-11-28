import { PageService } from './../../services/page.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { faPhoneAlt, faEnvelope, faBuilding } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  faPhoneAlt = faPhoneAlt;
  faEnvelope = faEnvelope;
  faBuilding = faBuilding;

 map_url: string = "https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed";

  is_submitted: boolean = false;

  contactUsForm: FormGroup = new FormGroup({
    'full_name': new FormControl(null, Validators.required),
    'issue_nature': new FormControl("", Validators.required),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'mobile_no': new FormControl(null, Validators.required),
    'subject': new FormControl(null, Validators.required),
    'message': new FormControl(null, Validators.required),
    'communication_mode': new FormControl(null, Validators.required),
    'is_copy': new FormControl(null, Validators.nullValidator),

  });
  constructor(public sanitizer: DomSanitizer, private pageService: PageService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.contactUsForm.invalid)
      return false;

      this.pageService.contactUsForm(this.contactUsForm.value).subscribe((resp:any) =>{
        this.contactUsForm.reset();
        this.is_submitted = true;
      });
      return true;
  }

  is_valid(field_name: string): boolean | undefined {
    return this.contactUsForm.get(field_name)?.invalid && this.contactUsForm.get(field_name)?.touched;
  }

}
