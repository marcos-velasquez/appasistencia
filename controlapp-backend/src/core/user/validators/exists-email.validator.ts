import { Injectable, NotFoundException } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from '@core/user/user.service';

@ValidatorConstraint({ name: 'existsEmail', async: true })
@Injectable()
export class ExistsEmailConstraint implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(email: string) {
    const exists = await this.userService.findOne({ email });

    if (!exists) {
      throw new NotFoundException('El email no existe');
    }

    return true;
  }
}
