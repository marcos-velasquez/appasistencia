import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthService } from '@core/auth/auth.service';
import { User } from '@core/user/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.findOne({ email });
    const { result, message } = await this.validators(user, password);

    if (!result) {
      throw new BadRequestException(message);
    }

    return result;
  }

  private async validators(user: User, password: string) {
    if (!user) {
      return { result: null, message: 'El usuario no existe' };
    }

    if (!user.status) {
      return { result: null, message: 'Su cuenta esta deshabilitada' };
    }

    if (!(await user['verifyPassword'](password))) {
      return { result: null, message: 'La contraseña es incorrecta' };
    }

    return { result: { _id: user['_id'], role: user.role } };
  }
}
