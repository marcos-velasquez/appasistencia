import { DistanceService } from './../../../shared/services/distance.service';
import { SubsidiaryService } from './../../subsidiary/subsidiary.service';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ExtendedValidationArguments } from '@shared/interfaces/validation-arguments.interface';
import { CoordinateDto } from '@core/subsidiary/dto';

@ValidatorConstraint({ async: true })
@Injectable()
export class DistanceConstraint implements ValidatorConstraintInterface {
  private MAX_DISTANCE = 100;
  constructor(private _subsidairy: SubsidiaryService) {}

  async validate(coordinates: CoordinateDto, args: ExtendedValidationArguments) {
    const subsidiaryId = args?.object['subsidiary'];
    const subsidiary = await this._subsidairy.findOne({ _id: subsidiaryId });
    return new DistanceService(coordinates, subsidiary.coordinates).get() <= this.MAX_DISTANCE;
  }

  defaultMessage() {
    return 'Debes estar a menos de 100 metros.';
  }
}
