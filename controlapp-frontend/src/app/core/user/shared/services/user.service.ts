import { FormDataService } from './form-data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { environment } from '@env';
import { pluck } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpoint: string = environment.API + 'users/';
  private endpointEmployees: string = environment.API + 'employees/';
  constructor(private http: HttpClient, private formData: FormDataService) {}
  getAllEmployees() {
    return this.http.get<User[]>(this.endpointEmployees);
  }

  getById(id: string) {
    return this.http.get<User>(this.endpoint + id);
  }

  getAmount() {
    return this.http.get<number>(this.endpointEmployees + 'amount');
  }

  getLastMembers() {
    return this.http.get<User[]>(this.endpointEmployees + 'last-members');
  }

  getAllDisabled() {
    return this.http.get<User[]>(this.endpointEmployees + 'disabled');
  }

  getAllEnabled() {
    return this.http.get<User[]>(this.endpointEmployees + 'enabled');
  }

  create(user: User) {
    return this.http.post<string>(this.endpoint, user);
  }

  delete(user: User) {
    return this.http.delete(this.endpoint + user._id);
  }

  edit(user: User) {
    return this.http.put<string>(this.endpoint, user).pipe(pluck('message'));
  }

  disabled(user: User) {
    return this.http.put<string>(this.endpoint, { _id: user._id, status: false }).pipe(pluck('message'));
  }

  enabled(user: User) {
    return this.http.put<string>(this.endpoint, { _id: user._id, status: true }).pipe(pluck('message'));
  }

  resetUdid(user: User) {
    return this.http.patch<string>(this.endpoint + 'reset/mobileIdentifier', user).pipe(pluck('message'));
  }

  uploadImage(user: User) {
    const userData = this.formData.toFormData<User>(user);
    return this.http.post<string>(this.endpoint + 'image/upload', userData).pipe(pluck('message'));
  }
}
