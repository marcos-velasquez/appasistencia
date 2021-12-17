import { PushNotificationService } from './shared/services/push-notification.service';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/shared/material/services/snackbar.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Assistance } from './shared/interfaces/assistance';
import { AssistanceService } from './shared/services/assistance.service';
import { environment } from '@env';
import { HttpQueries } from './shared/enums/http-queries.constant';

@Component({
  selector: 'app-calendar',
  templateUrl: './assistance.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AssistanceComponent implements OnInit {
  assistances: Assistance[] = [];
  API = environment.API + '/';
  lastRequest: Observable<any>;
  constructor(
    private _assistance: AssistanceService,
    private _snackbar: SnackbarService,
    private _pushNotification: PushNotificationService
  ) {}

  ngOnInit(): void {
    this._pushNotification.exists.subscribe((subscription) => {
      if (!subscription) {
        this._pushNotification.requestPermission();
      }
    });
  }

  refresh() {
    this.lastRequest.subscribe(this.success, this.error);
  }

  getAssistancesGlobal({ range }) {
    if (!!range.endDate) {
      this._assistance.getAllByRange(HttpQueries.ALL, range).subscribe(this.success, this.error);
      this.lastRequest = this._assistance.getAllByRange(HttpQueries.ALL, range);
    } else {
      this._assistance.getAll(HttpQueries.ALL).subscribe(this.success, this.error);
      this.lastRequest = this._assistance.getAll(HttpQueries.ALL);
    }
  }

  getAssistancesBySubsidiary({ subsidiary_id, range }) {
    if (!!range.endDate) {
      this._assistance.getAllByRange(HttpQueries.SUBSIDIARY, range, subsidiary_id).subscribe(this.success, this.error);
      this.lastRequest = this._assistance.getAllByRange(HttpQueries.ALL, range);
    } else {
      this._assistance.getAll(HttpQueries.SUBSIDIARY, subsidiary_id).subscribe(this.success, this.error);
      this.lastRequest = this._assistance.getAll(HttpQueries.SUBSIDIARY, subsidiary_id);
    }
  }

  getAssistancesByZone({ zone_id, range }) {
    if (!!range.endDate) {
      this._assistance.getAllByRange(HttpQueries.ZONE, range, zone_id).subscribe(this.success, this.error);
      this.lastRequest = this._assistance.getAllByRange(HttpQueries.ZONE, range, zone_id);
    } else {
      this._assistance.getAll(HttpQueries.ZONE, zone_id).subscribe(this.success, this.error);
      this.lastRequest = this._assistance.getAll(HttpQueries.ZONE, zone_id);
    }
  }

  getAssistancesByUser({ filter, value, range }) {
    if (!!range.endDate) {
      this._assistance.getAllByRange(HttpQueries.USER, range, value).subscribe(this.success, this.error);
      this.lastRequest = this._assistance.getAllByRange(HttpQueries.USER, range, value);
    } else {
      this._assistance.getAll(HttpQueries.USER, value).subscribe(this.success, this.error);
      this.lastRequest = this._assistance.getAll(HttpQueries.USER, value);
    }
  }

  private success = (assistances: Assistance[]) => {
    this.assistances = assistances;
    if (assistances.length === 0) {
      this._snackbar.info('No se encontraron resultados');
    }
  };

  private error = (message: string) => {
    this._snackbar.error(message);
  };
}
