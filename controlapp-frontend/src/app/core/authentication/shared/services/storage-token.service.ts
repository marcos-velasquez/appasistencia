import { Injectable } from '@angular/core';

@Injectable()
export class StorageTokenService {
  private KEY = 'TOKEN_SESSION';
  constructor() {}

  set(value: string) {
    localStorage.setItem(this.KEY, value);
  }

  get() {
    return localStorage.getItem(this.KEY);
  }

  remove() {
    localStorage.removeItem(this.KEY);
  }
  has(): boolean {
    return !!this.get();
  }
}
