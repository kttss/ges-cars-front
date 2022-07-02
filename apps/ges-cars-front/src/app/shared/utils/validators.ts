import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('confirmPassword');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { passwordsNotMatching: true };
};
// eslint-disable-next-line no-useless-escape
export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const phoneRegex = /(06|05|07)([ \-_/]*)(\d[ \-_/]*){8}/;
export const faxRegex = /(05)([ \-_/]*)(\d[ \-_/]*){8}/;

export const emailValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }

  if (emailRegex.test(value)) {
    return null;
  } else {
    return { email: true };
  }
};

export const phoneValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }

  if (phoneRegex.test(value)) {
    return null;
  } else {
    return { phone: true };
  }
};

export const faxValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }

  if (faxRegex.test(value)) {
    return null;
  } else {
    return { fax: true };
  }
};
