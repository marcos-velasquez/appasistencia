import { TakeComponent } from './components/take/take.component';
import { TracingComponent } from './components/tracing/tracing.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { GeolocationService } from './services/geolocation.service';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, Tab2PageRoutingModule],
  declarations: [Tab2Page, TracingComponent, TakeComponent],
  providers: [GeolocationService],
})
export class Tab2PageModule {}
