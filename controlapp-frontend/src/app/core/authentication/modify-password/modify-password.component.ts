import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '@shared/material/services/snackbar.service';
import { CustomValidatorsService } from './../shared/services/custom-validators.service';
import { AuthService } from './../shared/services/auth.service';
import { FormValidatorService } from '@shared/services/form-validator.service';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
})
export class ModifyPasswordComponent implements OnInit {
  form: FormGroup;
  formValidator: FormValidatorService;
  private token: string;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _snackbar: SnackbarService,
    private customValidators: CustomValidatorsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validators: [this.customValidators.repeatPassword] }
    );
    this.token = this.activatedRoute.snapshot.params.token;
    this.formValidator = new FormValidatorService(this.form);
  }

  onSubmit() {
    this.form.valid ? this.modify() : this.formValidator.markAllAsTouched();
  }

  private modify() {
    this.authService.newPassword(this.form.value.password, this.token).subscribe(this.success, this.error);
  }

  private success = (message: string): void => {
    this._snackbar.success(message);
    this.router.navigate(['login']);
  };

  private error = (message: string): void => {
    this._snackbar.error(message);
  };
}
