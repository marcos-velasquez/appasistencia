import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Subsidiary } from '@shared/interfaces/subsidiary.interface';
import { SocketService } from '../../services/socket.service';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-tracing',
  templateUrl: './tracing.component.html',
})
export class TracingComponent implements OnInit {
  distance: number;
  @Input() subsidiary: Subsidiary;

  constructor(
    public _modal: ModalController,
    private _geolocation: GeolocationService,
    private _socket: SocketService
  ) {}

  ngOnInit() {
    this._geolocation.watch.subscribe((position) => {
      const { latitude, longitude } = position.coords;
      this._socket.emit('position', { subsidiary: this.subsidiary, coordinates: { latitude, longitude } });
      this._socket.fromEvent('position').subscribe((distance: number) => (this.distance = distance));
    });
  }

  ngOnDestroy() {
    this._geolocation.clearWatch();
  }
}
