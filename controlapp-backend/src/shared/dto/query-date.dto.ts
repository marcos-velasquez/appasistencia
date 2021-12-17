import { IsDateString, IsNotEmpty } from 'class-validator';

export class QueryDateDto {
  @IsDateString({}, { message: 'La fecha es inválida' })
  @IsNotEmpty({ message: 'La fecha de inicio es requerida' })
  start: string;

  @IsDateString({}, { message: 'La fecha es inválida' })
  @IsNotEmpty({ message: 'La fecha final es requerida' })
  end: string;
}
