import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type SubsidiaryDocument = Subsidiary & Document;

@Schema()
export class Subsidiary {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    type: raw({
      latitude: { type: Number },
      longitude: { type: Number },
    }),
  })
  coordinates: { latitude: number; longitude: number };

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Zone' })
  zone: Types.ObjectId;

  @Prop({ default: true })
  status?: boolean;
}

export const SubsidiarySchema = SchemaFactory.createForClass(Subsidiary);
export type SubsidiaryDto = Subsidiary & { _id: Types.ObjectId };
