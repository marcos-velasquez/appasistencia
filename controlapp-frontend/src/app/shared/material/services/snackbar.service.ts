import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private config: MatSnackBarConfig = {
    duration: 2000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
  };
  constructor(private _snackBar: MatSnackBar) {}

  success(message: string): void {
    this.show(message, ['bg-green-700', 'text-white']);
  }
  error(message: string): void {
    this.show(message, ['bg-red-700', 'text-white']);
  }
  info(message: string): void {
    this.show(message, ['bg-blue-700', 'text-white']);
  }
  warning(message: string): void {
    this.show(message, ['bg-yellow-700', 'text-white']);
  }

  private show(message: string, panelClass: string[] = []): void {
    this._snackBar.open(message.toUpperCase(), 'CERRAR', { ...this.config, panelClass });
  }
}
