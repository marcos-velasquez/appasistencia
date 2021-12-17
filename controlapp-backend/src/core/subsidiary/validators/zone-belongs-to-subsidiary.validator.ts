import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ExtendedValidationArguments } from '@shared/interfaces/validation-arguments.interface';
import { SubsidiaryService } from './../subsidiary.service';
import { Types } from 'mongoose';

@ValidatorConstraint({ async: true })
@Injectable()
export class ZoneBelongsToSubsidiaryConstraint implements ValidatorConstraintInterface {
  constructor(private subsidiaryService: SubsidiaryService) {}

  async validate(zoneId: Types.ObjectId, args: ExtendedValidationArguments) {
    return !!(await this.subsidiaryService.findByZone(zoneId));
  }

  defaultMessage() {
    return 'La zona no pertenece a ninguna sucursal.';
  }
}
