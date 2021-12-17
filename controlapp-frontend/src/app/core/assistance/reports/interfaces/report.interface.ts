export interface Report<T> {
  generate(data?: T): void;
}
