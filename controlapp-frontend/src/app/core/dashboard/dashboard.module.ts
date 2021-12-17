import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { InfoBoxesComponent } from './info-boxes/info-boxes.component';

import { LastMembersComponent } from './last-members/last-members.component';
import { ChartsModule } from 'ng2-charts';
import { StatisticsComponent } from './statistics/statistics.component';
import { ComponentModule } from '@shared/components/component.module';

@NgModule({
  declarations: [DashboardComponent, InfoBoxesComponent, LastMembersComponent, StatisticsComponent],
  imports: [CommonModule, DashboardRoutingModule, ChartsModule, ComponentModule],
})
export class DashboardModule {}
