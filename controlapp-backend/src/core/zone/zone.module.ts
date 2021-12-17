import { ZoneController } from './zone.controller';
import { Zone, ZoneSchema } from './zone.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ZoneService } from './zone.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Zone.name, schema: ZoneSchema }])],
  providers: [ZoneService],
  controllers: [ZoneController],
})
export class ZoneModule {}
