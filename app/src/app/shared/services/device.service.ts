import { Device } from '@capacitor/device';

export class DeviceService {
  constructor() {}

  get mobileIdentifier() {
    return Device.getId();
  }
}
