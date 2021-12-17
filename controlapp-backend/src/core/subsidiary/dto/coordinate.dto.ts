import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export class CoordinateDto {
  @IsLatitude({ message: 'La latitud es inválida' })
  @IsNotEmpty({ message: 'La latitud es requerida' })
  latitude: number;

  @IsLongitude({ message: 'La logitud es inválida' })
  @IsNotEmpty({ message: 'La longitud es requerida' })
  longitude: number;
}
