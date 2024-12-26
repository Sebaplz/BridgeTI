import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null; // El campo está vacío, eso se manejará con el validador `required`.
    }

    // Reglas de validación
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isValidLength = value.length >= 8 && value.length <= 20;

    const errors: ValidationErrors = {};
    if (!hasUpperCase) {
      errors['uppercase'] = 'Debe contener al menos una letra mayúscula';
    }
    if (!hasLowerCase) {
      errors['lowercase'] = 'Debe contener al menos una letra minúscula';
    }
    if (!hasNumber) {
      errors['number'] = 'Debe contener al menos un número';
    }
    if (!hasSpecialCharacter) {
      errors['specialCharacter'] = 'Debe contener al menos un carácter especial';
    }
    if (!isValidLength) {
      errors['length'] = 'Debe tener entre 8 y 20 caracteres';
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };
}
