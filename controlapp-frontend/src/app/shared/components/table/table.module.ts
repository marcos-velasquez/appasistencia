import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { ResponsiveBreakpointService } from './services/responsive-breakpoint.service';
import { ToggleLabelComponent } from './components/toggle-label/toggle-label.component';
import { MaterialModule } from '@shared/material/material.module';

@NgModule({
  declarations: [TableComponent, ToggleLabelComponent],
  providers: [ResponsiveBreakpointService],
  imports: [CommonModule, MaterialModule],
  exports: [TableComponent],
})
export class TableModule {}
