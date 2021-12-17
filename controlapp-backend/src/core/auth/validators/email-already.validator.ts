import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from '@core/user/user.service';

@ValidatorConstraint({ name: 'emailAlready', async: true })
@Injectable()
export class EmailAlreadyConstraint implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(email: string, args: ValidationArguments) {
    const { object } = args;
    let field = { email };

    if (!!object['_id']) {
      field['_id'] = { $ne: object['_id'] };
    }

    const user = await this.userService.findOne(field).collation({ locale: 'es', strength: 1 });
    return !user;
  }

  defaultMessage() {
    return 'El email ya existe';
  }
}
