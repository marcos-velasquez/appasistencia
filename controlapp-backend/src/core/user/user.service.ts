import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument, UserDto } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}

  findAll(field: Partial<UserDto> = {}) {
    return this.user.find(field);
  }

  findOne(field: Partial<UserDto>) {
    return this.user.findOne(field);
  }

  create(createDto: Partial<UserDto>) {
    createDto.password = createDto.rut;
    return this.user.create(createDto);
  }

  deleteOne(_id: Types.ObjectId) {
    return this.user.deleteOne({ _id });
  }

  updateOne(_id: Types.ObjectId, updateDto: Partial<UserDto>) {
    return this.user.updateOne({ _id }, updateDto);
  }

  amount(field: Partial<UserDto> = {}) {
    return this.findAll(field).countDocuments();
  }

  lastMembers(field: Partial<UserDto> = {}, limit = 8) {
    return this.findAll(field).sort('-createdAt').limit(limit);
  }
}
