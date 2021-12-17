import { Validate } from 'class-validator';
import { ExistsEmailConstraint } from './../validators/exists-email.validator';

export class ExistsEmailDto {
  @Validate(ExistsEmailConstraint)
  email: string;
}
