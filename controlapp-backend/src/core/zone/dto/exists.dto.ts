import { Types } from 'mongoose';
import { Validate } from 'class-validator';
import { ExistsConstraint } from '@shared/validators';

export class ExistsDto {
  @Validate(ExistsConstraint, ['zones', 'La zona no existe'])
  _id: Types.ObjectId;
}
