import jwt_decode from 'jwt-decode';

export class JwtService {
  constructor() {}

  decode<T>(token: string): T {
    return jwt_decode<T>(token);
  }
}
