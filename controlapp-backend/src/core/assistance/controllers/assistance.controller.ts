import { Body, Controller, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AssistanceService } from '../assistance.service';
import { ExistsDto } from '../dto';
import { PopulateInterceptor } from '../interceptors/populate.interceptor';
import { QueryDateDto } from '@shared/dto/query-date.dto';
import { Roles } from '@core/auth/decorators';
import { Role } from '@core/auth/enums/role.enum';
import { PushSubscription } from 'web-push';

@Roles(Role.ADMIN, Role.EMPLOYEE)
@ApiBearerAuth()
@ApiTags('Assistances')
@Controller('assistances')
export class AssistanceController {
  constructor(private readonly assistanceService: AssistanceService) {}

  @Post('insert-push-subscription')
  insertPushSubscription(@Body() subscription: PushSubscription) {
    return this.assistanceService.insertPushSubscription(subscription);
  }

  @UseInterceptors(PopulateInterceptor)
  @Get()
  findAll() {
    return this.assistanceService.findAll();
  }

  @UseInterceptors(PopulateInterceptor)
  @Get('date')
  findAllByDate(@Query() { start, end }: QueryDateDto) {
    return this.assistanceService.findByDate({ start, end });
  }

  @UseInterceptors(PopulateInterceptor)
  @Get(':_id')
  async findOne(@Param() { _id }: ExistsDto) {
    return await this.assistanceService.findOne({ _id });
  }
}
