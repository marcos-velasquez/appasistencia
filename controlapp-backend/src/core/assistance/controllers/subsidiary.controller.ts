import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AssistanceService } from '../assistance.service';
import { ExistsDto as ExistsSubsidiaryDto } from '@core/subsidiary/dto';
import { QueryDateDto } from '@shared/dto/query-date.dto';
import { PopulateInterceptor } from '../interceptors/populate.interceptor';
import { Roles } from '@core/auth/decorators';
import { Role } from '@core/auth/enums/role.enum';

@Roles(Role.ADMIN, Role.EMPLOYEE)
@ApiBearerAuth()
@ApiTags('Subsidiary/assistances')
@Controller('subsidiary/assistances')
export class SubsidiaryController {
  constructor(private readonly assistanceService: AssistanceService) {}

  @UseInterceptors(PopulateInterceptor)
  @Get(':_id/date')
  findByDate(@Param() { _id }: ExistsSubsidiaryDto, @Query() { start, end }: QueryDateDto) {
    return this.assistanceService.findBySubsidiaryAndDate(_id, { start, end });
  }

  @UseInterceptors(PopulateInterceptor)
  @Get(':_id')
  async find(@Param() { _id }: ExistsSubsidiaryDto) {
    return await this.assistanceService.findBySubsidiary(_id);
  }
}
