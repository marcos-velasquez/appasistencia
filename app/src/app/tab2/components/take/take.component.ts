import { ToastService } from '@app/shared/services/toast.service';
import { DeviceService } from '@shared/services/device.service';
import { Component, Input, OnInit } from '@angular/core';
import { Assistance } from '@shared/interfaces/assistance.interface';
import { CurrentType } from '@app/shared/enums/currentType.enum';
import { AssistanceService } from '@shared/services/assistance.service';
import { Subsidiary } from '@shared/interfaces/subsidiary.interface';
import { GeolocationService } from './../../services/geolocation.service';

@Component({
  selector: 'app-take',
  templateUrl: './take.component.html',
})
export class TakeComponent implements OnInit {
  @Input() subsdiary: Subsidiary;
  assistance: Assistance;
  constructor(
    private _assistance: AssistanceService,
    private _geolocation: GeolocationService,
    private _toast: ToastService
  ) {}

  ngOnInit() {
    this._assistance.current().subscribe((assistance) => {
      this.assistance = assistance;
    }, this.error);
  }

  get type() {
    return Object.values(CurrentType)[this.assistance.counterCurrentType];
  }

  take() {
    this._geolocation.currentPosition.subscribe(async (position) => {
      const { latitude, longitude } = position.coords;
      const mobileIdentifier = (await new DeviceService().mobileIdentifier).uuid;
      const assistance = { coordinates: { latitude, longitude }, mobileIdentifier, subsidiary: this.subsdiary._id };
      this._assistance.take(assistance).subscribe((assistance) => (this.assistance = assistance), this.error);
    });
  }

  private error = (message: string) => {
    this._toast.error(message);
  };
}
