import { UserService } from './services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/authentication/interfaces/user.interface';
import { AuthService } from '@app/authentication/services/auth.service';
import { FormValidatorService } from '@app/shared/services/form-validator.service';
import { ToastService } from '@app/shared/services/toast.service';
import { environment } from '@env';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  form: FormGroup;
  formValidator: FormValidatorService;
  user: User;
  API = environment.API;

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _toast: ToastService,
    private _user: UserService
  ) {}

  ngOnInit() {
    this._auth.currentProfile.subscribe((user) => {
      this.user = user;
      this.form = this.fb.group({
        email: [this.user.email, [Validators.required, Validators.email]],
        rut: [this.user.rut, [Validators.required, Validators.pattern('([0-9]){7,8}-([0-9Kk]){1}')]],
        address: [this.user.address, [Validators.required]],
        phone: [this.user.phone, [Validators.required, Validators.pattern(/[0-9]+/)]],
        first_name: [this.user.first_name, [Validators.required]],
        last_name: [this.user.last_name, [Validators.required]],
      });
      this.formValidator = new FormValidatorService(this.form);
    });
  }

  async onSubmit() {
    this.form.valid ? this.edit() : this.formValidator.markAllAsTouched();
  }

  private edit() {
    this.form.value._id = this.user._id;
    this._user.edit(this.form.value).subscribe(this.success, this.error);
  }

  changeImage({ target }: Event) {
    this.user['file'] = target['files'][0];
    this._user.uploadImage(this.user).subscribe(this.success, this.error);
  }

  private success = (message: string) => {
    this._toast.success(message);
    this._auth.updateProfile();
  };

  private error = async (message: string) => {
    this._toast.error(message);
  };
}
