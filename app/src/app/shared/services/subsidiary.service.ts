import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Subsidiary } from './../interfaces/subsidiary.interface';

@Injectable({
  providedIn: 'root',
})
export class SubsidiaryService {
  private endpoint = environment.API + 'subsidiaries/';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Subsidiary[]>(this.endpoint + 'enabled');
  }
}
