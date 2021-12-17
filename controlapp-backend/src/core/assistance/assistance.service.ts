import { OnEvent } from '@nestjs/event-emitter';
import { PushNotificationManagerService } from './push-notification-manager.service';
import { Assistance, AssistanceDocument, AssistanceDto } from './assistance.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserService } from '@core/user/user.service';
import { InsertDto } from './dto/insert.dto';
import { CurrentType } from './enums/current.enum';
import { SubsidiaryService } from '../subsidiary/subsidiary.service';
import { UserDto } from '../user/user.schema';
import { DateManager } from './models/date-manager.models';
import { PushSubscription } from 'web-push';

@Injectable()
export class AssistanceService {
  constructor(
    @InjectModel(Assistance.name) private assistance: Model<AssistanceDocument>,
    private userService: UserService,
    private subsidiaryService: SubsidiaryService,
    private pushNotificationManagerService: PushNotificationManagerService,
  ) {}

  create(userId: Types.ObjectId) {
    return this.assistance.create({ user: userId });
  }

  findAll(field: Partial<AssistanceDto> = {}) {
    return this.assistance.find(field);
  }

  findOne(field: Partial<AssistanceDto>) {
    return this.assistance.findOne(field);
  }

  findByDate(range: { start: string; end: string }, options = {}) {
    return this.assistance.find({ saveDate: this.getRangeQuery(range) }).where(options);
  }

  private getRangeQuery(range: { start: string; end: string }) {
    return {
      $gte: DateManager.fromISO(range.start).startOf('day').toMillis(),
      $lte: DateManager.fromISO(range.end).endOf('day').toMillis(),
    };
  }

  async findByUser(field: Partial<UserDto>) {
    const { _id } = await this.userService.findOne(field);
    return this.assistance.find({ user: _id }).where();
  }

  async findByUserAndDate(field: Partial<UserDto>, range: { start: string; end: string }) {
    const { _id } = await this.userService.findOne(field);
    return this.assistance.find({ user: _id, saveDate: this.getRangeQuery(range) });
  }

  async findBySubsidiaryAndDate(_id: Types.ObjectId | Types.ObjectId[], range: { start: string; end: string }) {
    return this.assistance.find({ register: { $elemMatch: { subsidiary: _id } }, saveDate: this.getRangeQuery(range) });
  }

  async findBySubsidiary(_id: Types.ObjectId | Types.ObjectId[]) {
    return this.assistance.find({ register: { $elemMatch: { subsidiary: _id } } });
  }

  async findByZone(zone: Types.ObjectId) {
    const subsidiaries = await this.subsidiaryService.findByZone(zone);
    return this.findBySubsidiary(subsidiaries.map((subsidiary) => subsidiary._id));
  }

  async findByZoneAndDate(zone: Types.ObjectId, range: { start: string; end: string }) {
    const subsidiaries = await this.subsidiaryService.findByZone(zone);
    return this.findBySubsidiaryAndDate(
      subsidiaries.map((subsidiary) => subsidiary._id),
      range,
    );
  }

  async insert(userId: Types.ObjectId, createDto: InsertDto) {
    const assistance = await this.findOne({ user: userId, completed: false });
    assistance.register.push({
      date: new Date(),
      subsidiary: createDto.subsidiary,
      type: Object.values<CurrentType>(CurrentType)[assistance.counterCurrentType],
    });
    assistance.counterCurrentType += 1;
    const newAssistance = await assistance.save();
    (await this.pushNotificationManagerService.build(newAssistance)).send();
    return newAssistance;
  }

  deleteOne(_id: Types.ObjectId) {
    return this.assistance.deleteOne({ _id });
  }

  updateOne(_id: Types.ObjectId, updateDto: Partial<AssistanceDto>) {
    return this.assistance.updateOne({ _id }, updateDto);
  }

  insertPushSubscription(subscription: PushSubscription) {
    return this.pushNotificationManagerService.insert(subscription);
  }

  @OnEvent('user.deleted')
  async deleteByUser(_id: Types.ObjectId) {
    await this.assistance.deleteMany({ user: new Types.ObjectId(_id) });
  }
}
