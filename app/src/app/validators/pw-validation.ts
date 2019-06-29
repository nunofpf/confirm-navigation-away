import { AbstractControl } from '@angular/forms';
export class PasswordValidation {
  static matchPassword(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    if (password !== confirmPassword) {
      let errors = control.get('confirmPassword').errors;
      if (errors && typeof errors === 'object') {
        Object.assign(errors, {
          matchPassword: `Passwords don't match`
        });
      } else {
        errors = {
          matchPassword: `Passwords don't match`
        };
      }
      control.get('confirmPassword').setErrors(errors);
    } else {
      return null;
    }
  }
}
