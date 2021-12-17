import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDto, ExistsDto, UpdateDto } from './dto';
import { SubsidiaryService } from './subsidiary.service';
import { PopulateInterceptor } from './interceptors/populate.interceptor';
import { Roles } from '@core/auth/decorators';
import { Role } from '@core/auth/enums/role.enum';

@ApiBearerAuth()
@ApiTags('Subsidiaries')
@Controller('subsidiaries')
export class SubsidiaryController {
  constructor(private readonly subsidiaryService: SubsidiaryService) {}

  @Post()
  create(@Body() createDto: CreateDto) {
    return this.subsidiaryService.create(createDto);
  }

  @UseInterceptors(PopulateInterceptor)
  @Get()
  findAll() {
    return this.subsidiaryService.findAll();
  }

  @UseInterceptors(PopulateInterceptor)
  @Get('disabled')
  findAllDisabled() {
    return this.subsidiaryService.findAll({ status: false });
  }

  @Roles(Role.EMPLOYEE, Role.ADMIN)
  @UseInterceptors(PopulateInterceptor)
  @Get('enabled')
  findAllEnabled() {
    return this.subsidiaryService.findAll({ status: true });
  }

  @Get('amount')
  getAmount() {
    return this.subsidiaryService.amount();
  }

  @Get(':_id')
  findOne(@Param() { _id }: ExistsDto) {
    return this.subsidiaryService.findOne({ _id });
  }

  @Put()
  async update(@Body() updateDto: UpdateDto) {
    await this.subsidiaryService.updateOne(updateDto._id, updateDto);
    return 'Sucursal actualizada';
  }

  @Delete(':_id')
  async delete(@Param() { _id }: ExistsDto) {
    await this.subsidiaryService.deleteOne(_id);
    return 'Sucursal eliminada';
  }
}
