import { Types } from 'mongoose';
import { Validate } from 'class-validator';
import { ExistsConstraint } from 'src/shared/validators';

export class ExistsDto {
  @Validate(ExistsConstraint, ['users', 'El usuario no existe'])
  _id: Types.ObjectId;
}
