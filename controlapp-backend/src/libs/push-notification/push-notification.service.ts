import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as webPush from 'web-push';
import { Payload } from './interfaces/payload.interface';
import { PushSubscription, PushSubscriptionDocument } from './push.notification.schema';

@Injectable()
export class PushNotificationService {
  private vapidKeys = {
    publicKey: 'BEgPhcT1E0lNfNC-HgaAY0D0MZS_ol3ALlr2iD7JnvVtmQwUHB8MLUwco6jy_LhcEYW7PlVOQMLAtH56V3F3UD0',
    privateKey: 'hzg6VWdDOwKEQyN2ExtGfq7cZIGOn_c0677wDyg4V0M',
  };

  constructor(@InjectModel(PushSubscription.name) private pushNotification: Model<PushSubscriptionDocument>) {
    webPush.setVapidDetails('mailto:marcos.svz28@gmail.com', this.vapidKeys.publicKey, this.vapidKeys.privateKey);
  }

  getAll() {
    return this.pushNotification.find();
  }

  insert(subscription: PushSubscription) {
    return this.pushNotification.create(subscription);
  }

  deleteOne(_id: Types.ObjectId) {
    return this.pushNotification.deleteOne({ _id });
  }

  send(subscription: PushSubscription, payload: Payload) {
    webPush
      .sendNotification(subscription, JSON.stringify({ notification: payload }))
      .then((res) => {
        console.log('success: ', res);
      })
      .catch((err) => {
        console.log(err);
        this.deleteOne(subscription['_id']).then();
      });
  }

  async sendEveryone(payload: Payload) {
    const subscriptions = await this.getAll().lean();
    for (const subscription of subscriptions) {
      this.send(subscription, payload);
    }
  }
}
