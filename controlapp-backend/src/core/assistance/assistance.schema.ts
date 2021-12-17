import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CurrentType } from './enums/current.enum';
import { DateManager } from './models/date-manager.models';

export type AssistanceDocument = Assistance & Document;

@Schema({ timestamps: true })
export class Assistance {
  @Prop([
    raw({
      date: { type: Date },
      type: { type: String, enum: CurrentType },
      subsidiary: { type: Types.ObjectId, ref: 'Subsidiary' },
    }),
  ])
  register: { date: Date; type: CurrentType; subsidiary: Types.ObjectId }[];

  @Prop({ default: 0 })
  counterCurrentType: number;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ default: DateManager.now().toMillis() })
  saveDate: number;
}

export const AssistanceSchema = SchemaFactory.createForClass(Assistance);
export type AssistanceDto = Assistance & { _id: Types.ObjectId };
