import { IsEnabledGuard } from './../guards/is-enabled.guard';
import { Body, Controller, Get, Param, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AssistanceService } from '../assistance.service';
import { CurrentUser } from '@core/auth/interfaces/current-user.interface';
import { InjectUserToBody, User } from '@shared/decorators';
import { ExistsDto as ExistsUserDto, ExistsEmailDto, ExistsRutDto } from '@core/user/dto';
import { QueryDateDto } from '@shared/dto/query-date.dto';
import { PopulateInterceptor } from '../interceptors/populate.interceptor';
import { Role } from '@core/auth/enums/role.enum';
import { DateDto } from './../dto/date.dto';
import { InsertDto } from '../dto';
import { Roles } from '@core/auth/decorators/roles.decorator';

@Roles(Role.ADMIN, Role.EMPLOYEE)
@ApiBearerAuth()
@ApiTags('User/assistances')
@Controller('user/assistances')
export class UserController {
  constructor(private readonly assistanceService: AssistanceService) {}

  @InjectUserToBody()
  @Post()
  insert(@Body() insertDto: InsertDto, @User() { _id }: CurrentUser) {
    return this.assistanceService.insert(_id, insertDto);
  }

  @UseInterceptors(PopulateInterceptor)
  @Get()
  findAll(@User() { _id }: CurrentUser) {
    return this.assistanceService.findAll({ user: _id });
  }

  @UseInterceptors(PopulateInterceptor)
  @Get('date/:date')
  findOneByDate(@Param() { date }: DateDto, @User() { _id }: CurrentUser) {
    return this.assistanceService.findByUserAndDate({ _id }, { start: date, end: date });
  }

  @UseGuards(IsEnabledGuard)
  @UseInterceptors(PopulateInterceptor)
  @Get('current')
  async findCurrent(@User() { _id }: CurrentUser) {
    let assistance = await this.assistanceService.findOne({ user: _id, completed: false });
    if (!assistance) {
      assistance = await this.assistanceService.create(_id);
    }
    return assistance;
  }

  @UseInterceptors(PopulateInterceptor)
  @Get('email/:email')
  findByEmail(@Param() { email }: ExistsEmailDto) {
    return this.assistanceService.findByUser({ email });
  }

  @UseInterceptors(PopulateInterceptor)
  @Get('email/:email/date')
  findByEmailAndDate(@Param() { email }: ExistsEmailDto, @Query() { start, end }: QueryDateDto) {
    return this.assistanceService.findByUserAndDate({ email }, { start, end });
  }

  @UseInterceptors(PopulateInterceptor)
  @Get('rut/:rut')
  findByRut(@Param() { rut }: ExistsRutDto) {
    return this.assistanceService.findByUser({ rut });
  }

  @UseInterceptors(PopulateInterceptor)
  @Get('rut/:rut/date')
  findByRutAndDate(@Param() { rut }: ExistsRutDto, @Query() { start, end }: QueryDateDto) {
    return this.assistanceService.findByUserAndDate({ rut }, { start, end });
  }

  @UseInterceptors(PopulateInterceptor)
  @Get(':_id')
  async findByUser(@Param() { _id }: ExistsUserDto) {
    return await this.assistanceService.findAll({ user: _id });
  }
}
