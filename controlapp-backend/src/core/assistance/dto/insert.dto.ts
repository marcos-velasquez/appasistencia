import { DistanceConstraint } from './../validators/distance.validator';
import { IsEnabledConstraint } from './../../user/validators/is-enabled.validator';
import { Types } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { IsString, IsNotEmpty, Validate, IsDefined, ValidateNested } from 'class-validator';
import { ExistsConstraint } from '@shared/validators';
import { IsValidConstraint } from '../validators/is-valid.validator';
import { CoordinateDto } from '@core/subsidiary/dto';

export class InsertDto {
  @Validate(ExistsConstraint, ['subsidiaries', 'La sucursal no existe'])
  @IsNotEmpty({ message: 'La sucursal es requerida' })
  subsidiary: Types.ObjectId;

  @Validate(IsValidConstraint)
  @IsNotEmpty({ message: 'El identificador móvil es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El identificador móvil es inválido' })
  mobileIdentifier: string;

  @Validate(DistanceConstraint)
  @ValidateNested()
  @Type(() => CoordinateDto)
  coordinates: CoordinateDto;

  @Validate(IsEnabledConstraint)
  @IsDefined()
  user: Types.ObjectId;
}
