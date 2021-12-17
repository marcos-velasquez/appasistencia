import { FormDataService } from './form-data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { User } from '@app/authentication/interfaces/user.interface';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpoint: string = environment.API + 'users/';

  constructor(private http: HttpClient, private formData: FormDataService) {}

  edit(user: User) {
    return this.http.put<string>(this.endpoint, user).pipe(pluck('message'));
  }

  uploadImage(user: User) {
    const userData = this.formData.toFormData<User>(user);
    return this.http.post<string>(this.endpoint + 'image/upload', userData).pipe(pluck('message'));
  }
}
