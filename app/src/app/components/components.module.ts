import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { ActionSheetComponent } from './action-sheet/action-sheet.component';

const COMPONENTS = [ActionSheetComponent];

@NgModule({
  imports: [IonicModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
