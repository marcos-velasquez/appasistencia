import { Assistance } from './../interfaces/assistance';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RangeOfDate } from '@shared/interfaces/range-date.interface';
import { HttpQueries } from '../enums/http-queries.constant';

@Injectable({
  providedIn: 'root',
})
export class AssistanceService {
  private endpoint: string = environment.API;

  constructor(private http: HttpClient) {}

  private getRange(range: RangeOfDate) {
    return { start: new Date(range.startDate).toISOString(), end: new Date(range.endDate).toISOString() };
  }

  private format(params: string) {
    return !!params ? params + '/' : params;
  }

  getAll(query: HttpQueries, params = '') {
    return this.http.get<Assistance[]>(this.endpoint + query + 'assistances/' + this.format(params));
  }

  getAllByRange(query: HttpQueries, range: RangeOfDate, params = '') {
    return this.http.get<Assistance[]>(this.endpoint + query + 'assistances/' + this.format(params) + 'date', {
      params: this.getRange(range),
    });
  }

  insertPushSubscription(subscription: PushSubscription) {
    return this.http.post(this.endpoint + 'assistances/insert-push-subscription', subscription);
  }
}
