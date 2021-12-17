import { PartialType } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Validate } from 'class-validator';
import { ExistsConstraint } from '@shared/validators';
import { CreateDto } from './create.dto';

export class UpdateDto extends PartialType(CreateDto) {
  @Validate(ExistsConstraint, ['zones', 'La zona no existe'])
  _id: Types.ObjectId;
}
