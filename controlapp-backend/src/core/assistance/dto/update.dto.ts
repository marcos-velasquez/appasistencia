import { PartialType } from '@nestjs/swagger';
import { ExistsConstraint } from '@shared/validators';
import { Validate } from 'class-validator';
import { Types } from 'mongoose';
import { InsertDto } from './insert.dto';

export class UpdateDto extends PartialType(InsertDto) {
  @Validate(ExistsConstraint, ['assistances', 'La asistencia no existe'])
  _id: Types.ObjectId;
}
