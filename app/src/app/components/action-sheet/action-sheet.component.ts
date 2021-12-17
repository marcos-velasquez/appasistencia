import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/authentication/services/auth.service';
import { ChangePasswordComponent } from '@app/authentication/components/change-password/change-password.component';
@Component({
  selector: 'app-action-sheet',
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss'],
})
export class ActionSheetComponent implements OnInit {
  constructor(private _auth: AuthService, private _modal: ModalController) {}

  ngOnInit() {}

  async changePassword() {
    (await this._modal.create({ component: ChangePasswordComponent })).present();
  }

  logout() {
    this._auth.logOut();
  }
}
