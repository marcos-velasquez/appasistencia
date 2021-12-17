import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PushNotificationService } from './push-notification.service';
import { PushSubscription, PushSubscriptionSchema } from './push.notification.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PushSubscription.name, schema: PushSubscriptionSchema }])],
  providers: [PushNotificationService],
  exports: [PushNotificationService],
})
export class PushNotificationModule {}
