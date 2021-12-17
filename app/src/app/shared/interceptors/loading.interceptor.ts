import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private _loading: LoadingController) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(this._loading.create({ spinner: 'bubbles' })).pipe(
      map((loader) => {
        loader.present();
        return loader;
      }),
      switchMap((loader) => {
        return next.handle(request).pipe(finalize(() => loader.dismiss()));
      })
    );
  }
}
export const HTTP_LOADING_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: LoadingInterceptor,
  multi: true,
};
