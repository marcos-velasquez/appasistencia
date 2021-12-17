import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AssistanceComponent } from './assistance.component';
import { AssistanceRoutingModule } from './assistance-routing.module';
import { FilterTabsComponent } from './filter-tabs/filter-tabs.component';
import { TableComponent } from './table/table.component';
import { SubisidiaryFilterComponent } from './filter-tabs/subisidiary-filter/subisidiary-filter.component';
import { UserFilterComponent } from './filter-tabs/user-filter/user-filter.component';
import { UserFilterPipe } from './shared/pipes/user-filter.pipe';
import { GlobalFilterComponent } from './filter-tabs/global-filter/global-filter.component';
import { ZoneFilterComponent } from './filter-tabs/zone-filter/zone-filter.component';
import { SharedModule } from '@shared/shared.module';
import { SocketIoModule } from 'ngx-socket-io';

@NgModule({
  declarations: [
    AssistanceComponent,
    FilterTabsComponent,
    TableComponent,
    SubisidiaryFilterComponent,
    UserFilterComponent,
    UserFilterPipe,
    GlobalFilterComponent,
    ZoneFilterComponent,
  ],
  imports: [CommonModule, AssistanceRoutingModule, ReactiveFormsModule, SharedModule, SocketIoModule],
})
export class AssistanceModule {}
