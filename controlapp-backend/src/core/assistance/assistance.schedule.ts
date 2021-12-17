import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from '@core/user/user.service';
import { Role } from '@core/auth/enums/role.enum';
import { AssistanceService } from './assistance.service';

@Injectable()
export class AssistanceScheduleService {
  constructor(private userService: UserService, private assistanceService: AssistanceService) {}

  //@Cron(CronExpression.EVERY_10_SECONDS)
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { timeZone: 'America/Santiago' })
  async everyDay() {
    await this.complete();
    await this.create();
  }

  private async complete() {
    const assistances = await this.assistanceService.findAll({ completed: false });
    for (const assistance of assistances) {
      assistance.completed = true;
      await assistance.save();
    }
  }

  private async create() {
    const users = await this.userService.findAll({ role: Role.EMPLOYEE, status: true });
    for (const user of users) {
      await this.assistanceService.create(user._id);
    }
  }
}
