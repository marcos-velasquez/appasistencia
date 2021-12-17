import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private duration = 2000;
  constructor(private toast: ToastController) {}

  async error(message: string) {
    (await this.toast.create({ color: 'danger', message: message.toUpperCase(), duration: this.duration })).present();
  }

  async success(message: string) {
    (await this.toast.create({ color: 'success', message: message.toUpperCase(), duration: this.duration })).present();
  }
}
