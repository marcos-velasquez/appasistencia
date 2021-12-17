import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { TableModule } from './table/table.module';
import { NavModule } from './nav/nav.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material/material.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LineComponent } from './charts/line.component';
import { SelectPeriodComponent } from './select-period/select-period.component';
import { AuthenticationModule } from '@core/authentication/authentication.module';

@NgModule({
  declarations: [EditProfileComponent, LineComponent, SelectPeriodComponent],
  imports: [
    CommonModule,
    NavModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    ChartsModule,
    AuthenticationModule,
    TableModule,
  ],
  exports: [LineComponent, SelectPeriodComponent, NavModule, TableModule],
})
export class ComponentModule {}
