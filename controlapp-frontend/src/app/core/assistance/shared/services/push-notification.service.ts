import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { SnackbarService } from '@shared/material/services/snackbar.service';
import { AssistanceService } from './assistance.service';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  private publicKey = 'BEgPhcT1E0lNfNC-HgaAY0D0MZS_ol3ALlr2iD7JnvVtmQwUHB8MLUwco6jy_LhcEYW7PlVOQMLAtH56V3F3UD0';
  constructor(private swPush: SwPush, private _snackbar: SnackbarService, private _assistance: AssistanceService) {}

  async requestPermission() {
    try {
      const subscription = await this.swPush.requestSubscription({ serverPublicKey: this.publicKey });
      this._assistance.insertPushSubscription(subscription).subscribe(
        () => {
          this._snackbar.success('LAS NOTIFICACIONES HAN SIDO HABILITADAS');
        },
        (message) => {
          this._snackbar.error(message);
        }
      );
    } catch (error) {
      await this.swPush.unsubscribe();
      this._snackbar.warning('LAS NOTIFICACIONES HAN SIDO DESHABILITADAS');
    }
  }

  get exists() {
    return this.swPush.subscription;
  }
}
