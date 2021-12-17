import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class ChangePasswordDto {
  @MinLength(8, { message: 'Contraseña (Mínimo de caracteres 8)' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'La contraseña es inválida' })
  password: string;
}
