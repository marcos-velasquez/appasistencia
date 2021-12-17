import { Validate } from 'class-validator';
import { Types } from 'mongoose';
import { ExistsConstraint } from '@shared/validators';

export class ExistsDto {
  @Validate(ExistsConstraint, ['assistances', 'La asistencia no existe'])
  _id: Types.ObjectId;
}
