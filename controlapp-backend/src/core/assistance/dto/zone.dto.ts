import { Validate } from 'class-validator';
import { Types } from 'mongoose';
import { ExistsConstraint } from '@shared/validators';
import { ZoneBelongsToSubsidiaryConstraint } from '@core/subsidiary/validators/zone-belongs-to-subsidiary.validator';

export class ZoneDto {
  @Validate(ZoneBelongsToSubsidiaryConstraint)
  @Validate(ExistsConstraint, ['zones', 'La zona no existe'])
  _id: Types.ObjectId;
}
