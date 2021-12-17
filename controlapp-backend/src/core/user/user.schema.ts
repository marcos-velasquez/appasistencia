import { Role } from '@core/auth/enums/role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ default: 'default.png' })
  image: string;

  @Prop({ required: true, unique: true })
  rut: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @ExcludeProperty()
  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop({ enum: Role, default: Role.EMPLOYEE })
  role: Role;

  @Prop({ default: true })
  status: boolean;

  @Prop({ default: null })
  mobileIdentifier: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDto = User & { _id: Types.ObjectId };
import './user.hooks';
