import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Connection, Types } from 'mongoose';

@ValidatorConstraint({ name: 'exists', async: true })
@Injectable()
export class ExistsConstraint implements ValidatorConstraintInterface {
  constructor(@InjectConnection() readonly connection: Connection) {}

  async validate(_id: string, args: ValidationArguments) {
    this.isValid(_id);
    const { constraints } = args;
    const [collection, message] = constraints;

    const exists = await this.connection.collection(collection).findOne({ _id: new Types.ObjectId(_id) });

    if (!exists) {
      throw new NotFoundException(message);
    }
    return true;
  }

  isValid(_id: string) {
    const isValidObjectId = Types.ObjectId.isValid(_id);
    if (!isValidObjectId) {
      throw new BadRequestException('Identificador inválido');
    }
  }
}
