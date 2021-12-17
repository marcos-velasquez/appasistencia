import { JwtStrategy } from './jwt';
import { LocalStrategy } from './local';

export const Authenticators = [JwtStrategy, LocalStrategy];
