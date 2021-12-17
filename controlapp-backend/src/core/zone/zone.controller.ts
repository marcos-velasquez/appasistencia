import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDto, ExistsDto, UpdateDto } from './dto';
import { ZoneService } from './zone.service';

@ApiBearerAuth()
@ApiTags('Zones')
@Controller('zones')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Post()
  create(@Body() createDto: CreateDto) {
    return this.zoneService.create(createDto);
  }

  @Get()
  findAll() {
    return this.zoneService.findAll();
  }

  @Get('amount')
  amount() {
    return this.zoneService.amount();
  }

  @Get(':_id')
  findOne(@Param() { _id }: ExistsDto) {
    return this.zoneService.findOne({ _id });
  }

  @Put()
  async update(@Body() updateDto: UpdateDto) {
    await this.zoneService.updateOne(updateDto._id, updateDto);
    return 'Zona actualizada';
  }

  @Delete(':_id')
  async delete(@Param() { _id }: ExistsDto) {
    await this.zoneService.deleteOne(_id);
    return 'Zona eliminada';
  }
}
