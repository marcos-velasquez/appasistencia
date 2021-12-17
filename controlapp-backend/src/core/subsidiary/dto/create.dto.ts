import { Transform, Type } from 'class-transformer';
import { IsString, IsNotEmpty, Validate, ValidateNested, Matches } from 'class-validator';
import { ExistsConstraint, IsUniqueConstraint, Regex } from '@shared/validators';
import { CoordinateDto } from './coordinate.dto';
import { Types } from 'mongoose';

export class CreateDto {
  @Validate(IsUniqueConstraint, ['subsidiaries'], {
    message: 'La sucursal ya existe',
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El nombre es inválido' })
  name: string;

  @ValidateNested()
  @Type(() => CoordinateDto)
  coordinates: CoordinateDto;

  @IsNotEmpty({ message: 'La dirección es requerida' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'La dirección es inválida' })
  address: string;

  @Matches(Regex.phone, { message: 'El número del local es inválido' })
  @IsNotEmpty({ message: 'El número del local es requerido' })
  @IsString({ message: 'El número del local es inválido' })
  number: string;

  @Validate(ExistsConstraint, ['zones', 'La zona no existe'])
  @IsNotEmpty({ message: 'La zona es requerida' })
  zone: Types.ObjectId;
}
