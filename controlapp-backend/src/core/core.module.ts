import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ZoneModule } from './zone/zone.module';
import { SubsidiaryModule } from './subsidiary/subsidiary.module';
import { AssistanceModule } from './assistance/assistance.module';

const MODULES = [AuthModule, UserModule, ZoneModule, SubsidiaryModule, AssistanceModule];

@Module({
  imports: MODULES,
  exports: MODULES,
})
export class CoreModule {}
