import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssistanceDocument } from './../assistance.schema';
import { PopulateManager } from '@shared/services/populate-manager.service';

@Injectable()
export class PopulateInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((assistances: AssistanceDocument[]) => {
        return new PopulateManager([{ path: 'user' }, { path: 'register.subsidiary' }]).exec(assistances);
      }),
    );
  }
}
