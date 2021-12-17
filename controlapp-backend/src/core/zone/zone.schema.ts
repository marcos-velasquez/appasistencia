import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ZoneDocument = Zone & Document;

@Schema()
export class Zone {
  @Prop({ required: true, unique: true })
  name: string;
}

export const ZoneSchema = SchemaFactory.createForClass(Zone);
export type ZoneDto = Zone & { _id: Types.ObjectId };
