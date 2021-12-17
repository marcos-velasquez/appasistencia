import { SharedModule } from './../shared/shared.module';
import { ZoneModule } from './zone/zone.module';
import { UserModule } from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AssistanceModule } from './assistance/assistance.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { NgModule } from '@angular/core';
import { SubsidiaryModule } from './subsidiary/subsidiary.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    AuthenticationModule,
    AssistanceModule,
    DashboardModule,
    SubsidiaryModule,
    UserModule,
    ZoneModule,
  ],
})
export class CoreModule {}
