import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AssistanceService } from '../assistance.service';
import { QueryDateDto } from '@shared/dto/query-date.dto';
import { PopulateInterceptor } from '../interceptors/populate.interceptor';
import { ZoneDto } from '../dto';
import { Roles } from '@core/auth/decorators';
import { Role } from '@core/auth/enums/role.enum';

@Roles(Role.ADMIN, Role.EMPLOYEE)
@ApiBearerAuth()
@ApiTags('Zone/assistances')
@Controller('zone/assistances')
export class ZoneController {
  constructor(private readonly assistanceService: AssistanceService) {}

  @UseInterceptors(PopulateInterceptor)
  @Get(':_id/date')
  findByDate(@Param() { _id }: ZoneDto, @Query() { start, end }: QueryDateDto) {
    return this.assistanceService.findByZoneAndDate(_id, { start, end });
  }

  @UseInterceptors(PopulateInterceptor)
  @Get(':_id')
  async find(@Param() { _id }: ZoneDto) {
    return await this.assistanceService.findByZone(_id);
  }
}
