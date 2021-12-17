import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    const isLoggin = this.authService.isLogginValue;
    if (isLoggin) {
      this.router.navigate(['profile']);
      return false;
    }
    return true;
  }
}
