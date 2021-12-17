import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { environment } from '@env';
import { UserLogin } from '../interfaces/auth.interface';
import { JwtService } from './jwt.service';
import { StorageTokenService } from './storage-token.service';
import { User } from '@core/user/interfaces/user';
import { ROLE } from '../enums/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggin$: BehaviorSubject<boolean>;
  private currentProfile$: ReplaySubject<User> = new ReplaySubject();
  private endpoint = environment.API + 'auth/';

  constructor(private storageToken: StorageTokenService, private http: HttpClient, private jwtService: JwtService) {
    let initialState = storageToken.has();

    if (initialState) {
      this.updateProfile();
    }
    this.isLoggin$ = new BehaviorSubject(initialState);
  }

  get isLogin(): Observable<boolean> {
    return this.isLoggin$.asObservable();
  }

  get isLogginValue(): boolean {
    return this.isLoggin$.value;
  }

  get currentProfile() {
    return this.currentProfile$.asObservable();
  }

  async updateProfile() {
    this.http.get<User>(this.endpoint + 'profile').subscribe((user) => {
      this.currentProfile$.next(user);
      this.isLoggin$.next(true);
    });
  }

  login(user: UserLogin) {
    return this.http.post<any>(this.endpoint + 'login', user).pipe(
      tap(({ token }) => {
        const user = this.jwtService.decode<User>(token);
        if (user.role === ROLE.ADMIN) {
          this.storageToken.set(token);
          location.reload();
        } else {
          throw 'Acceso Denegado';
        }
      })
    );
  }

  logOut(): void {
    this.storageToken.remove();
    location.reload();
  }

  newPassword(password: string, token: string) {
    return this.http.post(this.endpoint + 'new-password/' + token, { password }).pipe(pluck('message'));
  }

  recoverPassword(email: string) {
    return this.http.post(this.endpoint + 'forgot-password', { email }).pipe(pluck('message'));
  }
}
