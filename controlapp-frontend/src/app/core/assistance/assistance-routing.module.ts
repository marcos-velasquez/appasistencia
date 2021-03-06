import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AssistanceComponent } from './assistance.component';

const routes: Routes = [{ path: '', component: AssistanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistanceRoutingModule {}
