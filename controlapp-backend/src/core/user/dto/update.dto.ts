import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, Validate } from 'class-validator';
import { Types } from 'mongoose';
import { ExistsConstraint } from '@shared/validators';
import { RegisterDto } from './register.dto';

export class UpdateDto extends PartialType(RegisterDto) {
  @Validate(ExistsConstraint, ['users', 'El usuario no existe'])
  _id: Types.ObjectId;

  @IsBoolean({ message: 'El estado es inválido' })
  @IsOptional()
  status: boolean;
}
