import { AuthService } from '@core/authentication/shared/services/auth.service';
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from '@env';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '@shared/components/edit-profile/edit-profile.component';
import { User } from '@core/user/interfaces/user';
import { UserService } from '@core/user/shared/services/user.service';
import { SnackbarService } from '@shared/material/services/snackbar.service';

@Component({
  selector: 'app-nav-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit {
  API = environment.API;
  user: User;
  links = [
    {
      title: 'Dashboard',
      path: 'dashboard',
    },
    {
      title: 'Sucursales',
      path: 'sucursales',
    },
    {
      title: 'Usuarios',
      path: 'usuarios',
    },
    {
      title: 'Asistencias',
      path: 'asistencias',
    },
  ];
  constructor(
    public _auth: AuthService,
    private userService: UserService,
    private dialog: MatDialog,
    private _snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this._auth.currentProfile.subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this._auth.logOut();
  }

  edit() {
    this.dialog.open(EditProfileComponent, { data: this.user, width: '60%', minWidth: '400px' });
  }

  @HostListener('change', ['$event.target.files[0]'])
  selectImage(file: File) {
    this.user['file'] = file;
    this.userService.uploadImage(this.user).subscribe(
      (message: string) => {
        this._snackbar.success(message);
        this._auth.updateProfile();
      },
      (message) => this._snackbar.error(message)
    );
  }
}
