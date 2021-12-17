import { AssistanceService } from '../assistance.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { REQUEST_USER } from 'src/shared/interceptors/request-user.interceptor';
import { ExtendedValidationArguments } from '@shared/interfaces/validation-arguments.interface';
import { UserService } from '@core/user/user.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsValidConstraint implements ValidatorConstraintInterface {
  private MAX_ASSISTANCE_COUNTER = 4;
  constructor(private userService: UserService, private assistanceService: AssistanceService) {}

  async validate(mobileIdentifier: string, args: ExtendedValidationArguments) {
    const userId = args?.object[REQUEST_USER]._id;

    const user = await this.userService.findOne({ _id: userId });

    if (user.mobileIdentifier !== mobileIdentifier) {
      throw new BadRequestException('Ya iniciastes sesión en otro dispositivo');
    }

    let assistance = await this.assistanceService.findOne({ user: user._id, completed: false });

    if (assistance.counterCurrentType === this.MAX_ASSISTANCE_COUNTER) {
      throw new BadRequestException('Ya completastes todas tus asistencias por hoy');
    }

    return true;
  }
}
