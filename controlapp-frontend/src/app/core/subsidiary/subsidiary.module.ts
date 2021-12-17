import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { GoogleMapsComponent } from './modals/google-maps/google-maps.component';
import { SubsidiaryRoutingModule } from './subsidiary-routing.module';
import { SubsidiaryComponent } from './subsidiary.component';
import { CreateComponent } from './modals/create/create.component';
import { EditComponent } from './modals/edit/edit.component';
import { ListDeletedComponent } from './modals/list-deleted/list-deleted.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    SubsidiaryComponent,
    CreateComponent,
    EditComponent,
    ListDeletedComponent,
    GoogleMapsComponent,
    StatisticsComponent,
  ],
  imports: [
    CommonModule,
    SubsidiaryRoutingModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot(),
    SharedModule,
  ],
})
export class SubsidiaryModule {}
