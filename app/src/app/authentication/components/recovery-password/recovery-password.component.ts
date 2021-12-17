import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/authentication/services/auth.service';
import { FormValidatorService } from '@app/shared/services/form-validator.service';
import { ToastService } from '@app/shared/services/toast.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
})
export class RecoveryPasswordComponent implements OnInit {
  form: FormGroup;
  formValidator: FormValidatorService;

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private router: Router,
    private _toast: ToastService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.formValidator = new FormValidatorService(this.form);
  }

  async onSubmit() {
    this.form.valid ? this.recovery() : this.formValidator.markAllAsTouched();
  }

  private async recovery() {
    this._auth.recoverPassword(this.form.value.email).subscribe(this.success, this.error);
  }

  private success = (message: string) => {
    this._toast.success(message);
    this.router.navigate(['/authentication']);
  };

  private error = async (message: string) => {
    this._toast.error(message);
  };
}
