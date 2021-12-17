import { SnackbarService } from '@shared/material/services/snackbar.service';
import { UserComponent } from './../../user.component';
import { Component, OnInit, Output } from '@angular/core';
import { User } from '../../interfaces/user';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';

import { UserService } from '@core/user/shared/services/user.service';
@Component({
  selector: 'app-list-deleted',
  templateUrl: './list-deleted.component.html',
})
export class ListDeletedComponent implements OnInit {
  users: User[] = [];
  private copy: User[] = [];

  constructor(
    private _user: UserService,
    public dialogRef: MatDialogRef<UserComponent>,
    private _snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this._user.getAllDisabled().subscribe((users) => {
      this.users = users;
      this.copy = this.users;
    });
  }

  filter({ target }) {
    this.users = this.copy.filter((user) => user.email.includes(target.value));
  }

  restore(user: User) {
    this._user.enabled(user).subscribe(
      (message: string) => {
        this._snackbar.success(message);
        this.ngOnInit();
        this.dialogRef.close(true);
      },
      (message) => {
        this._snackbar.error(message);
      }
    );
  }

  remove(user: User): void {
    Swal.fire({
      title: '¿Estás segur@?',
      html: '<small class="text-red-500">Se eliminarán todas las asistencias relacionadas con el usuario.</small>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this._user.delete(user).subscribe(
          () => this.ngOnInit(),
          (message: string) => {
            this._snackbar.error(message);
          }
        );
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
