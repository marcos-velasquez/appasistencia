import { Validate } from 'class-validator';
import { ExistsRutConstraint } from './../validators/exists-rut.validator';

export class ExistsRutDto {
  @Validate(ExistsRutConstraint)
  rut: string;
}
