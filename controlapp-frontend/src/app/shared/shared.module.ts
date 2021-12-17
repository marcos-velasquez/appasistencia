import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { ComponentModule } from './components/component.module';
import { HTTP_ERROR_INTERCEPTOR } from './interceptors/error.interceptor';

const MODULES = [ComponentModule, MaterialModule];

@NgModule({
  providers: [HTTP_ERROR_INTERCEPTOR],
  imports: MODULES,
  exports: MODULES,
})
export class SharedModule {}
