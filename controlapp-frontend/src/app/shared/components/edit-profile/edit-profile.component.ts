import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidatorsService } from '@core/authentication/shared/services/custom-validators.service';
import { User } from '@core/user/interfaces/user';
import { AuthService } from '@core/authentication/shared/services/auth.service';
import { SnackbarService } from '@shared/material/services/snackbar.service';
import { UserService } from '@core/user/shared/services/user.service';
import { environment } from '@env';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent implements OnInit {
  form: FormGroup;
  API = environment.API + '/';

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    public validators: CustomValidatorsService,
    private _user: UserService,
    private _snackbar: SnackbarService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.form = this.fb.group({
      email: [this.data.email, [Validators.required, Validators.email]],
      rut: [this.data.rut, [Validators.required, Validators.pattern('([0-9]){7,8}-([0-9Kk]){1}')]],
      address: [this.data.address, [Validators.required]],
      phone: [this.data.phone, [Validators.required, Validators.pattern(/[0-9]+/)]],
      first_name: [this.data.first_name, [Validators.required]],
      last_name: [this.data.last_name, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const user = { ...this.data, ...this.form.value };

      this._user.edit(user).subscribe(
        (message: string) => {
          this._snackbar.success(message);
          this._auth.updateProfile();
          this.dialogRef.close();
        },
        (message: string) => this._snackbar.error(message)
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
