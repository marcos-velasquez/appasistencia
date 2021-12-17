import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { REQUEST_USER } from 'src/shared/interceptors/request-user.interceptor';
import { UserService } from '../user.service';
import { ExtendedValidationArguments } from '@shared/interfaces/validation-arguments.interface';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEnabledConstraint implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(value: string, args: ExtendedValidationArguments) {
    const userId = args?.object[REQUEST_USER]._id;

    const user = await this.userService.findOne({ _id: userId });

    return user.status;
  }

  defaultMessage() {
    return 'Su cuenta actualmente esta deshabilitada';
  }
}
