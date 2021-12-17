import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Zone, ZoneDocument, ZoneDto } from './zone.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ZoneService {
  constructor(@InjectModel(Zone.name) private zone: Model<ZoneDocument>) {}

  findAll(field: Partial<ZoneDto> = {}) {
    return this.zone.find(field);
  }

  findOne(field: Partial<ZoneDto>) {
    return this.zone.findOne(field);
  }

  amount(field: Partial<ZoneDto> = {}) {
    return this.findAll(field).countDocuments();
  }

  create(createDto: Zone) {
    return this.zone.create(createDto);
  }

  deleteOne(_id: Types.ObjectId) {
    return this.zone.deleteOne({ _id });
  }

  updateOne(_id: Types.ObjectId, updateDto: Partial<ZoneDto>) {
    return this.zone.updateOne({ _id }, updateDto);
  }
}
