import { Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { SocketModule } from './socket/socket.module';
import { MongoHooksEventModule } from './mongo-hooks-event/mongo-hooks-event.module';
import { ScheduleModule } from './schedule/schedule.module';
import { PushNotificationModule } from './push-notification/push-notification.module';

const MODULES = [MailModule, SocketModule, MongoHooksEventModule, ScheduleModule, PushNotificationModule];

@Module({
  imports: MODULES,
  exports: MODULES,
})
export class LibsModule {}
