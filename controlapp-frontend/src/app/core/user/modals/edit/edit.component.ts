import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '@shared/material/services/snackbar.service';
import { UserService } from '../../shared/services/user.service';
import { UserComponent } from '../../user.component';
import { environment } from '@env';
import { User } from '@core/user/interfaces/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  form: FormGroup;
  API = environment.API + '/';

  constructor(
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private fb: FormBuilder,
    private _snackbar: SnackbarService,
    private _user: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      rut: [this.user.rut, [Validators.required, Validators.pattern('([0-9]){7,8}-([0-9Kk]){1}')]],
      address: [this.user.address, [Validators.required]],
      phone: [this.user.phone, [Validators.required, Validators.pattern(/[0-9]+/)]],
      first_name: [this.user.first_name, [Validators.required]],
      last_name: [this.user.last_name, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.value._id = this.user._id;
      this._user.edit(this.form.value).subscribe(
        (message: string) => {
          this._snackbar.success(message);
          this.dialogRef.close(true);
        },
        (message: string) => {
          this._snackbar.error(message);
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
