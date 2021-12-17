import { FormValidatorService } from '@shared/services/form-validator.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/authentication/services/auth.service';
import { Router } from '@angular/router';
import { DeviceService } from '@shared/services/device.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.formValidator = new FormValidatorService(this.form);
  }

  async onSubmit() {
    this.form.valid ? this.login() : this.formValidator.markAllAsTouched();
  }

  private async login() {
    this.form.value.mobileIdentifier = (await new DeviceService().mobileIdentifier).uuid;
    this._auth.login(this.form.value).subscribe(this.success, this.error);
  }

  private success = () => {
    this.router.navigate(['']);
  };

  private error = (message: string) => {
    this._toast.error(message);
  };
}
