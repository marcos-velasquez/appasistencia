import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ExistsDto } from './exists.dto';

export class StatusDto extends ExistsDto {
  @IsNotEmpty({ message: 'El estado es requerido' })
  @IsBoolean({ message: 'El estado es inválido' })
  status: boolean;
}
