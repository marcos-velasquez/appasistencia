import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticsComponent } from './statistics/statistics.component';
import { SubsidiaryComponent } from './subsidiary.component';

const routes: Routes = [
  {
    path: '',
    component: SubsidiaryComponent,
  },
  {
    path: 'estadistica/:id',
    component: StatisticsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubsidiaryRoutingModule {}
