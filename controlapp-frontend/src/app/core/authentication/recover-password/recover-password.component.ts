import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '@shared/material/services/snackbar.service';
import { FormValidatorService } from '@shared/services/form-validator.service';
import { AuthService } from './../shared/services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
})
export class RecoverPasswordComponent implements OnInit {
  form: FormGroup;
  formValidator: FormValidatorService;

  constructor(private fb: FormBuilder, private authService: AuthService, private _snackbar: SnackbarService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.formValidator = new FormValidatorService(this.form);
  }

  onSubmit() {
    this.form.valid ? this.recover() : this.formValidator.markAllAsTouched();
  }

  private recover() {
    this.authService.recoverPassword(this.form.value.email).subscribe(this.success, this.error);
  }

  private success = (message: string): void => {
    this._snackbar.success(message);
  };
  private error = (message: string): void => {
    this._snackbar.error(message);
  };
}
