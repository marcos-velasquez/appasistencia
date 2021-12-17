import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Socket } from 'ngx-socket-io';
import { StorageTokenService } from '@core/authentication/shared/services/storage-token.service';

@Injectable({ providedIn: 'root' })
export class SocketService extends Socket {
  constructor(private _storage: StorageTokenService) {
    super({
      url: environment.BACKEND_BASE_URL,
      options: {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: 'Bearer ' + _storage.get(),
            },
          },
        },
      },
    });
  }
}
