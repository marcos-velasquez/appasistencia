import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, Validate } from 'class-validator';
import { IsUniqueConstraint } from '@shared/validators';

export class CreateDto {
  @Validate(IsUniqueConstraint, ['zones'], { message: 'La zona ya existe' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El nombre es inválido' })
  name: string;
}
