import { AbstractControl, FormGroup } from '@angular/forms';

export function zipCodeValidator(control: AbstractControl) {
  if (control && control.value !== undefined && control.value !== null) {
    const regex = new RegExp('^[0-9]{6}$');
    if (!regex.test(control.value)) return { isError: true };
  }

  return null;
}

export function confirmValidator(control: AbstractControl) {
  if (control && control.value !== undefined && control.value !== null) {
    const confirmFieldValue = control.value;
    const matchField = control.root.get('password');
    if (matchField) {
      matchField.valueChanges.subscribe((x) =>
        control.updateValueAndValidity()
      );
      const matchFieldValue = matchField.value;
      if (confirmFieldValue !== matchFieldValue || matchFieldValue === '')
        return { confirmed: true };
    }
  }

  return null;
}
