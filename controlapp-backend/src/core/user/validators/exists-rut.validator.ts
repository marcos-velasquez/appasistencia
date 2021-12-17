import { Injectable, NotFoundException } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from '@core/user/user.service';

@ValidatorConstraint({ name: 'existsRut', async: true })
@Injectable()
export class ExistsRutConstraint implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(rut: string) {
    const exists = await this.userService.findOne({ rut });

    if (!exists) {
      throw new NotFoundException('El rut no existe');
    }

    return true;
  }
}
