import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {
    const isLoggin = this.authService.isLogginValue;

    if (isLoggin) {
      return true;
    }

    this.router.navigate(['/authentication']);
    return false;
  }
}
