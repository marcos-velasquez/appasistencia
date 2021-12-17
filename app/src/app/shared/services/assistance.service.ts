import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Assistance, CreateAssistance } from './../interfaces/assistance.interface';

@Injectable({
  providedIn: 'root',
})
export class AssistanceService {
  private endpoint = environment.API + 'user/assistances/';

  constructor(private http: HttpClient) {}

  current() {
    return this.http.get<Assistance>(this.endpoint + 'current');
  }

  getAll() {
    return this.http.get<Assistance[]>(this.endpoint);
  }

  getOne(date: Date) {
    return this.http.get<Assistance[]>(this.endpoint + 'date/' + date).pipe(map((assistances) => assistances[0]));
  }

  take(assistance: CreateAssistance) {
    return this.http.post<Assistance>(this.endpoint, assistance);
  }
}
