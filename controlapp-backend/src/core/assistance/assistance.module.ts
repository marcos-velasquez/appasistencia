import { DistanceConstraint } from './validators/distance.validator';
import { Assistance, AssistanceSchema } from './assistance.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssistanceService } from './assistance.service';
import { UserModule } from '@core/user/user.module';
import { SubsidiaryModule } from '@core/subsidiary/subsidiary.module';
import { AssistanceController, UserController, SubsidiaryController, ZoneController } from './controllers';
import { IsValidConstraint } from './validators/is-valid.validator';
import { AssistanceScheduleService } from './assistance.schedule';
import { GeolocationSocket } from './sockets';
import { SocketModule } from '@libs/socket/socket.module';
import { PushNotificationModule } from '@libs/push-notification/push-notification.module';
import { PushNotificationManagerService } from './push-notification-manager.service';

@Module({
  imports: [
    SocketModule,
    UserModule,
    SubsidiaryModule,
    MongooseModule.forFeature([{ name: Assistance.name, schema: AssistanceSchema }]),
    PushNotificationModule,
  ],
  providers: [
    AssistanceService,
    IsValidConstraint,
    DistanceConstraint,
    AssistanceScheduleService,
    GeolocationSocket,
    PushNotificationManagerService,
  ],
  controllers: [AssistanceController, UserController, SubsidiaryController, ZoneController],
})
export class AssistanceModule {}
