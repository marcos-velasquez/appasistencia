import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CreateComponent } from './modals/create/create.component';
import { EditComponent } from './modals/edit/edit.component';
import { ZoneComponent } from './zone.component';

@NgModule({
  declarations: [CreateComponent, EditComponent, ZoneComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
})
export class ZoneModule {}
