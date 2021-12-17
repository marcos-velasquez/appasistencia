import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '@core/user/user.service';
@Injectable()
export class IsEnabledGuard implements CanActivate {
  constructor(private _user: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userId = context.switchToHttp().getRequest().user._id;
    const user = await this._user.findOne({ _id: userId });

    if (!user.status) {
      throw new BadRequestException('Su cuenta actualmente esta deshabilitada');
    }

    return true;
  }
}
