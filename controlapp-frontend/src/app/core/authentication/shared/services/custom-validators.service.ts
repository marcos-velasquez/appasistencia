import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorsService {
  constructor() {}
  repeatPassword(control: FormGroup): { [key: string]: boolean } | null {
    const { repeatPassword, password } = control.controls;
    return password.value === repeatPassword.value ? null : { repeatPassword: true };
  }

  onlyNumber(event: InputEvent) {
    const value = event.data;
    const isValid = /[0123456789+]/.test(value);
    if (!isValid) {
      const target = event.target as HTMLFormElement;
      const inputValue: string = target.value;
      target.value = inputValue.substring(0, inputValue.length - 1);
    }
  }
}
