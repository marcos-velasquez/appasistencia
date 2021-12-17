import { UserFilters } from '../enums/user-filter.enum';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter',
})
export class UserFilterPipe implements PipeTransform {
  transform(filter: UserFilters): string {
    switch (filter) {
      case UserFilters.EMAIL:
        return 'Email';

      case UserFilters.RUT:
        return 'Rut';
    }
  }
}
