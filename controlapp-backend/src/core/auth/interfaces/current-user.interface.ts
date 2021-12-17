import { Types } from 'mongoose';
import { Role } from '../enums/role.enum';

export interface CurrentUser {
  _id: Types.ObjectId;
  role: Role;
}
