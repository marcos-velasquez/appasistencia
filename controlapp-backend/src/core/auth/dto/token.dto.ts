import { Transform } from 'class-transformer';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsValidTokenConstraint } from '@core/auth/validators';

export class TokenDto {
  @Validate(IsValidTokenConstraint)
  @IsNotEmpty({ message: 'El token es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  token: string;
}
