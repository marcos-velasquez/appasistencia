import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  constructor() {}

  toFormData<T>(value: T): FormData {
    const formData = new FormData();
    const keys = Object.keys(value);

    for (let key of keys) {
      const formValue = value[key];
      formData.append(key, formValue);
    }

    return formData;
  }
}
