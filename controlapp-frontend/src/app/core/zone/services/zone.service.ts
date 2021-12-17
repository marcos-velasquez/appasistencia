import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'rxjs/operators';
import { environment } from '@env';
import { Zone } from '../interfaces/zone.interface';

@Injectable({ providedIn: 'root' })
export class ZoneService {
  private endpoint = environment.API + 'zones/';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Zone[]>(this.endpoint);
  }
  getById(_id: string) {
    return this.http.get<Zone>(this.endpoint + _id);
  }
  getAmount() {
    return this.http.get<number>(this.endpoint + 'amount');
  }

  create(zone: Zone) {
    return this.http.post<Zone>(this.endpoint, zone);
  }

  remove(zone: Zone) {
    return this.http.delete<string>(this.endpoint + zone._id).pipe(pluck('message'));
  }

  edit(zone: Zone) {
    return this.http.put<string>(this.endpoint, zone).pipe(pluck('message'));
  }
}
