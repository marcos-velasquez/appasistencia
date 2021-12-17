import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubsidiaryDocument } from '../subsidiary.schema';
import { PopulateManager } from '@shared/services/populate-manager.service';
@Injectable()
export class PopulateInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((subsidiaries: SubsidiaryDocument[]) => {
        return new PopulateManager([{ path: 'zone' }]).exec(subsidiaries);
      }),
    );
  }
}
