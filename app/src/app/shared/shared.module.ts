import { NgModule } from '@angular/core';
import { HTTP_ERROR_INTERCEPTOR } from './interceptors/error.interceptor';

@NgModule({
  providers: [HTTP_ERROR_INTERCEPTOR],
})
export class SharedModule {}
