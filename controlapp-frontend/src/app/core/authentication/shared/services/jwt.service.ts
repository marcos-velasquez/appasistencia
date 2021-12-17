import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable()
export class JwtService {
  constructor() {}

  decode<T>(token: string): T {
    return jwt_decode<T>(token);
  }
}
