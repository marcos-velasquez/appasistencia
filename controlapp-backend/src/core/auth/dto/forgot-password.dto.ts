import { Transform } from 'class-transformer';
import { IsNotEmpty, IsEmail, Validate } from 'class-validator';
import { ExistsEmailConstraint } from '@core/user/validators';

export class ForgotPasswordDto {
  @Validate(ExistsEmailConstraint)
  @IsNotEmpty({ message: 'El email es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEmail({}, { message: 'El email es inválido' })
  email: string;
}
