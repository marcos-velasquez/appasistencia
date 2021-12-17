import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, Validate } from 'class-validator';
import { Types } from 'mongoose';
import { ExistsConstraint } from '@shared/validators';
import { CreateDto } from './create.dto';

export class UpdateDto extends PartialType(CreateDto) {
  @Validate(ExistsConstraint, ['subsidiaries', 'La sucursal no existe'])
  _id: Types.ObjectId;

  @IsBoolean({ message: 'El estado es inválido' })
  @IsOptional()
  status: boolean;
}
