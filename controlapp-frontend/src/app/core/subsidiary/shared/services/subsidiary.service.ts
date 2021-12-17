import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'rxjs/operators';
import { environment } from '@env';
import { Subsidiary } from '../interfaces/subsidiary.interface';

@Injectable({ providedIn: 'root' })
export class SubsidiaryService {
  private endpoint = environment.API + 'subsidiaries/';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Subsidiary[]>(this.endpoint);
  }

  getAllEnabled() {
    return this.http.get<Subsidiary[]>(this.endpoint + 'enabled');
  }

  getAllDisabled() {
    return this.http.get<Subsidiary[]>(this.endpoint + 'disabled');
  }

  getById(_id: string) {
    return this.http.get<Subsidiary>(this.endpoint + _id);
  }

  getAmount() {
    return this.http.get<number>(this.endpoint + 'amount');
  }

  create(subsidiary: Subsidiary) {
    return this.http.post(this.endpoint, subsidiary);
  }

  disabled(subsidiary: Subsidiary) {
    return this.http.put<string>(this.endpoint, { _id: subsidiary._id, status: false }).pipe(pluck('message'));
  }

  enabled(subsidiary: Subsidiary) {
    return this.http.put<string>(this.endpoint, { _id: subsidiary._id, status: true }).pipe(pluck('message'));
  }

  delete(subsidiary: Subsidiary) {
    return this.http.delete<string>(this.endpoint + subsidiary._id);
  }

  edit(subsidiary: Subsidiary) {
    return this.http.put<string>(this.endpoint, subsidiary).pipe(pluck('message'));
  }
}
