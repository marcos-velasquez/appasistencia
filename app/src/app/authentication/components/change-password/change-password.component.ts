import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/authentication/services/auth.service';
import { CustomValidatorsService } from '@app/authentication/services/custom-validators.service';
import { FormValidatorService } from '@app/shared/services/form-validator.service';
import { ToastService } from '@app/shared/services/toast.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  formValidator: FormValidatorService;

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _toast: ToastService,
    private _customValidator: CustomValidatorsService,
    public _modal: ModalController
  ) {}

  ngOnInit() {
    console.log('mierda');
    this.form = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validators: [this._customValidator.repeatPassword] }
    );
    this.formValidator = new FormValidatorService(this.form);
  }

  async onSubmit() {
    console.log(this.form.valid);
    this.form.valid ? this.change() : this.formValidator.markAllAsTouched();
  }

  private async change() {
    this._auth.changePassword(this.form.value.password).subscribe(this.success, this.error);
  }

  private success = (message: string) => {
    console.log(message);
    this._toast.success(message);
  };

  private error = async (message: string) => {
    this._toast.error(message);
  };
}
