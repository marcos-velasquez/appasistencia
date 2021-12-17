import { Geolocation } from '@capacitor/geolocation';

export class Permission {
  private success = 'granted';

  async isGranted() {
    const permission = await Geolocation.checkPermissions();
    if (permission.location !== this.success) {
      return this.request();
    }
    return true;
  }

  private async request() {
    const permission = await Geolocation.requestPermissions();
    if (permission.location !== this.success) {
      return false;
    }
    return true;
  }
}
