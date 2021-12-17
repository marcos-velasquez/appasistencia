import { IsDateString, IsNotEmpty } from 'class-validator';

export class DateDto {
  @IsDateString({}, { message: 'La fecha es inválida' })
  @IsNotEmpty({ message: 'La fecha de inicio es requerida' })
  date: string;
}
