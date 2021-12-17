export class StorageService {
  constructor(private KEY: string) {}

  set(value: string) {
    sessionStorage.setItem(this.KEY, value);
  }

  get() {
    return sessionStorage.getItem(this.KEY);
  }

  remove() {
    sessionStorage.removeItem(this.KEY);
  }
  has(): boolean {
    return Boolean(this.get());
  }
}
