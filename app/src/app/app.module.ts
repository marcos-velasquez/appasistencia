import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_LOADING_INTERCEPTOR } from './shared/interceptors/loading.interceptor';
import { ComponentsModule } from './components/components.module';
import { HTTP_JWT_INTERCEPTOR } from './authentication/interceptors/jwt.interceptor';
import { SharedModule } from './shared/shared.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HTTP_JWT_INTERCEPTOR,
    HTTP_LOADING_INTERCEPTOR,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
