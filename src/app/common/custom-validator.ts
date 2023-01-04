import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidator {
  public isSubscribe: any;
  constructor() { }

  zipCodeValidator(control: AbstractControl) {
    if (control && control.value !== undefined && control.value !== null) {
      const regex = new RegExp('^[0-9]{6}$');
      if (!regex.test(control.value)) return { isError: true };
    }
    return null;
  }

  confirmValidator(control: AbstractControl) {
    if (control && control.value !== undefined && control.value !== null) {
      const confirmFieldValue = control.value;
      const matchField = control.root.get('password');
      if (matchField) {
        const matchFieldValue = matchField.value;
        if (confirmFieldValue !== matchFieldValue) return { confirmed: true };
      }
    }
    return null;
  }



  joinMatchField(matchField: any, matchWithField: any) {
    this.isSubscribe = matchField?.valueChanges.subscribe((x: any) =>
      matchWithField.updateValueAndValidity()
    );
  }

  extractErrors(form_obj: any, errors: any, error_messages: any) {
    for (let field_name of Object.keys(errors)) {
      form_obj.controls[field_name].setErrors({
        custom: true,
      });

      let field_obj = error_messages[field_name as keyof typeof error_messages];
      let result = field_obj.filter((key: any) => key.type === 'custom');
      if (result.length) {
        result[0].message = errors[field_name][0];
      } else {
        field_obj.push({
          type: 'custom',
          message: errors[field_name][0],
        });
      }
    }
  }

  is_valid(form_obj: any, field_name: string): boolean | undefined {
    return (
      form_obj.get(field_name)?.invalid && form_obj.get(field_name)?.touched
    );
  }
  errorType(form_obj: any, field_name: string, type: string = 'required') {
    return form_obj.controls[field_name].getError(type);
  }

  destroySubscribe() {
    if (this.isSubscribe) {
      this.isSubscribe.unsubscribe();
      this.isSubscribe = null;
    }
  }
}
