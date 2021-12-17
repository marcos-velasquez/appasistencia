import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PushNotificationService } from '@libs/push-notification/push-notification.service';
import { AssistanceDocument } from './assistance.schema';
import { PopulateManager } from '@shared/services/populate-manager.service';
import { PushSubscription } from 'web-push';
import { Payload } from '@libs/push-notification/interfaces/payload.interface';
import { DateManager } from './models/date-manager.models';

@Injectable()
export class PushNotificationManagerService {
  private payload: Payload = { title: '', image: '', body: '' };

  constructor(private configService: ConfigService, private pushNotificationService: PushNotificationService) {}

  async build(assistance: AssistanceDocument) {
    const populate = [{ path: 'user' }, { path: 'register.subsidiary' }];
    const toISOTimeOptions = { includeOffset: false, suppressMilliseconds: true, suppressSeconds: true };
    const { user, register, counterCurrentType } = (await new PopulateManager(populate).exec(assistance)) as any;
    const lastRegister = register[counterCurrentType - 1];

    this.payload = {
      title: `${user.first_name.toUpperCase()} ${user.last_name.toUpperCase()}`,
      body: `
        ${lastRegister.subsidiary.name}\n
        ${lastRegister.type}\n
        ${DateManager.fromDate(new Date(lastRegister.date)).toISOTime(toISOTimeOptions)}`,
      image: `${this.configService.get('API_URL')}${user.image}`,
    };

    return this;
  }

  send() {
    this.pushNotificationService.sendEveryone(this.payload);
  }

  insert(subscription: PushSubscription) {
    return this.pushNotificationService.insert(subscription);
  }
}
