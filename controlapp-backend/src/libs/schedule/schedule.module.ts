import { Module } from '@nestjs/common';
import { ScheduleModule as Schedule } from '@nestjs/schedule';

@Module({
  imports: [Schedule.forRoot()],
})
export class ScheduleModule {}
