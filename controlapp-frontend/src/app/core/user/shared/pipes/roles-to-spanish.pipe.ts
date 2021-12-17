import { Pipe, PipeTransform } from '@angular/core';
import { ROLE } from '@core/authentication/shared/enums/role.enum';

@Pipe({
  name: 'rolesToSpanish',
})
export class RolesToSpanishPipe implements PipeTransform {
  transform(value: ROLE): string {
    switch (value) {
      case ROLE.EMPLOYEE:
        return 'EMPLEADO';
    }
  }
}
