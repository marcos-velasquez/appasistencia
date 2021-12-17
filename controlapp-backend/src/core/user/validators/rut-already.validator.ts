import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from '@core/user/user.service';

@ValidatorConstraint({ name: 'rutAlready', async: true })
@Injectable()
export class RutAlreadyConstraint implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(rut: string, args: ValidationArguments) {
    const { object } = args;
    let field = { rut };

    if (!!object['_id']) {
      field['_id'] = { $ne: object['_id'] };
    }

    const user = await this.userService.findOne(field);
    return !user;
  }

  defaultMessage() {
    return 'El rut ya existe';
  }
}
