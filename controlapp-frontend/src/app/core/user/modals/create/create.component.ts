import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '@shared/material/services/snackbar.service';
import { UserService } from './../../shared/services/user.service';
import { UserComponent } from '../../user.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserComponent>,
    private fb: FormBuilder,
    private _snackbar: SnackbarService,
    private _user: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      rut: ['', [Validators.required, Validators.pattern('([0-9]){7,8}-([0-9Kk]){1}')]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/[0-9]+/)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this._user.create(this.form.value).subscribe(
        () => {
          this._snackbar.success('Usuario creado');
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
