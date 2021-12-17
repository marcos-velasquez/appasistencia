import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubsidiaryService } from './subsidiary.service';
import { SubsidiaryController } from './subsidiary.controller';
import { Subsidiary, SubsidiarySchema } from './subsidiary.schema';
import { ZoneBelongsToSubsidiaryConstraint } from './validators/zone-belongs-to-subsidiary.validator';

@Module({
  imports: [MongooseModule.forFeature([{ name: Subsidiary.name, schema: SubsidiarySchema }])],
  providers: [SubsidiaryService, ZoneBelongsToSubsidiaryConstraint],
  controllers: [SubsidiaryController],
  exports: [SubsidiaryService],
})
export class SubsidiaryModule {}
