import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function rutValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const rut = control.value;
    if (!rut) {
      return null; // No validar si el campo está vacío (esto lo maneja `Validators.required`)
    }

    // Eliminar puntos y guiones
    const cleanRut = rut.replace(/\./g, '').replace('-', '');
    if (!/^\d{7,8}[0-9Kk]$/.test(cleanRut)) {
      return { invalidFormat: true }; // Formato inválido
    }

    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1).toUpperCase();

    let sum = 0;
    let multiplier = 2;

    // Calcular el dígito verificador
    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body.charAt(i), 10) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const calculatedDv = 11 - (sum % 11);
    const validDv = calculatedDv === 11 ? '0' : calculatedDv === 10 ? 'K' : calculatedDv.toString();

    return dv === validDv ? null : { invalidDv: true }; // Validar el dígito verificador
  };
}
