import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, Matches, Validate } from 'class-validator';
import { EmailAlreadyConstraint } from '@core/auth/validators';
import { Regex } from '@shared/validators';
import { RutAlreadyConstraint } from './../validators/rut-already.validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El nombre es inválido' })
  first_name: string;

  @IsNotEmpty({ message: 'El apellido es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El apellido es inválido' })
  last_name: string;

  @Validate(EmailAlreadyConstraint)
  @Matches(Regex.email, { message: 'Email (formato inválido)' })
  @IsNotEmpty({ message: 'El email es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEmail({}, { message: 'El email es inválido' })
  email: string;

  @IsNotEmpty({ message: 'El teléfono es requerido' })
  @Matches(Regex.phone, { message: 'Teléfono (formato inválido)' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El teléfono es inválido' })
  phone: string;

  @Validate(RutAlreadyConstraint)
  @Matches(Regex.rut, { message: 'RUT (formato inválido)' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El rut es inválido' })
  rut: string;

  @IsNotEmpty({ message: 'La dirección es requerida' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'La dirección es inválida' })
  address: string;
}
