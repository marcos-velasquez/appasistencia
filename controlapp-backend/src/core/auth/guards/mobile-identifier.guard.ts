import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import * as Useragent from 'express-useragent';
import { UserService } from '@core/user/user.service';
import { Role } from '../enums/role.enum';

@Injectable()
export class MobileIdentifierGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { body, headers } = context.switchToHttp().getRequest();
    const source = Useragent.parse(headers['user-agent']);

    if (source.isMobile) {
      const { mobileIdentifier, email } = body;

      if (!mobileIdentifier) {
        throw new BadRequestException('El identificador móvil es requerido');
      }

      const currentUser = await this.userService.findOne({ email });
      if (!!currentUser && currentUser.role === Role.ADMIN) {
        throw new BadRequestException('No puedes iniciar sesión con una cuenta administrativa');
      }

      const user = await this.userService.findOne({ mobileIdentifier });
      if (!!user && user.email !== email) {
        throw new BadRequestException('Ya otro usuario ha iniciado sesión en este dispositivo');
      }

      if (!currentUser.mobileIdentifier) {
        currentUser.mobileIdentifier = mobileIdentifier;
        await currentUser.save();
      } else if (currentUser.mobileIdentifier !== mobileIdentifier) {
        throw new BadRequestException('Ya iniciastes sesión en otro dispositivo.');
      }
    }

    return true;
  }
}
