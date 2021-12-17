import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PushSubscriptionDocument = PushSubscription & Document;

@Schema()
export class PushSubscription {
  @Prop({ required: true })
  endpoint: string;

  @Prop({ default: null })
  expirationTime?: number;

  @Prop(
    raw({
      p256dh: { type: String },
      auth: { type: String },
    }),
  )
  keys: { p256dh: string; auth: string };
}

export const PushSubscriptionSchema = SchemaFactory.createForClass(PushSubscription);
