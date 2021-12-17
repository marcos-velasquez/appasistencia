import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Subject, from } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class GeolocationService {
  private watchId;
  private $wathPosition = new Subject<GeolocationPosition>();
  constructor() {}

  get currentPosition() {
    return from(Geolocation.getCurrentPosition());
  }

  get watch() {
    this.watchPosition();
    return this.$wathPosition.pipe(debounceTime(600));
  }

  private async watchPosition() {
    this.watchId = await Geolocation.watchPosition({}, (position) => {
      this.$wathPosition.next(position);
    });
  }

  clearWatch() {
    Geolocation.clearWatch({ id: this.watchId });
  }
}
