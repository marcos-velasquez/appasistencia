import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Subsidiary, SubsidiaryDocument, SubsidiaryDto } from './subsidiary.schema';

@Injectable()
export class SubsidiaryService {
  constructor(@InjectModel(Subsidiary.name) private subsidiary: Model<SubsidiaryDocument>) {}

  findAll(field: Partial<SubsidiaryDto> = {}) {
    return this.subsidiary.find(field);
  }

  findOne(field: Partial<SubsidiaryDto>) {
    return this.subsidiary.findOne(field);
  }

  findByZone(_id: Types.ObjectId) {
    return this.subsidiary.find({ zone: _id });
  }

  create(createDto: Subsidiary) {
    return this.subsidiary.create(createDto);
  }

  amount(field: Partial<SubsidiaryDto> = {}) {
    return this.findAll(field).countDocuments();
  }

  deleteOne(_id: Types.ObjectId) {
    return this.subsidiary.deleteOne({ _id });
  }

  updateOne(_id: Types.ObjectId, updateDto: Partial<SubsidiaryDto>) {
    return this.subsidiary.updateOne({ _id }, updateDto);
  }
}
