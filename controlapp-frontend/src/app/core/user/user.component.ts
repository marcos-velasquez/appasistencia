import { SnackbarService } from './../../shared/material/services/snackbar.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { User } from './interfaces/user';
import { UserService } from './shared/services/user.service';
import { dataDisplay } from './constants/data-display.constant';
import { CreateComponent } from './modals/create/create.component';
import { ListDeletedComponent } from './modals/list-deleted/list-deleted.component';
import { EditComponent } from './modals/edit/edit.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  users: User[];
  dataDisplay = dataDisplay;

  constructor(private dialog: MatDialog, private _user: UserService, private _snackbar: SnackbarService) {}

  ngAfterViewInit() {
    this.setData();
  }
  private setData = (hasNew = true) => {
    if (hasNew) {
      this._user.getAllEnabled().subscribe((users) => {
        this.users = users;
      });
    }
  };

  create(): void {
    this.dialog.open(CreateComponent).afterClosed().subscribe(this.setData);
  }

  edit(user: User): void {
    this.dialog.open(EditComponent, { data: user }).afterClosed().subscribe(this.setData);
  }

  disabled(user: User): void {
    Swal.fire({
      title: '¿Estás segur@?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this._user.disabled(user).subscribe(() => this.setData());
      }
    });
  }
  showDisabled() {
    this.dialog.open(ListDeletedComponent, { width: '90%' }).afterClosed().subscribe(this.setData);
  }

  resetUdid(user: User) {
    Swal.fire({
      title: '¿Estás segur@?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this._user.resetUdid(user).subscribe((message: string) => {
          this._snackbar.success(message);
        });
      }
    });
  }
}
