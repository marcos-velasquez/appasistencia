import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Socket } from 'ngx-socket-io';
import { StorageService } from '@app/authentication/services/storage-token.service';

@Injectable({ providedIn: 'root' })
export class SocketService extends Socket {
  constructor() {
    super({
      url: environment.BACKEND_BASE_URL,
      options: {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: 'Bearer ' + new StorageService('AUTH_TOKEN').get(),
            },
          },
        },
      },
    });
  }
}
