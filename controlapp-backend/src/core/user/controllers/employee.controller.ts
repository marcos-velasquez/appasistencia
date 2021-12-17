import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user.service';
import { Role } from '@core/auth/enums/role.enum';
import { Roles } from '@core/auth/decorators';

@Roles(Role.EMPLOYEE, Role.ADMIN)
@ApiBearerAuth()
@ApiTags('Employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll({ role: Role.EMPLOYEE });
  }

  @Get('disabled')
  findAllDisabled() {
    return this.userService.findAll({ role: Role.EMPLOYEE, status: false });
  }

  @Get('enabled')
  findAllEnabled() {
    return this.userService.findAll({ role: Role.EMPLOYEE, status: true });
  }

  @Get('amount')
  amount() {
    return this.userService.amount({ role: Role.EMPLOYEE });
  }

  @Get('last-members')
  lastMembers() {
    return this.userService.lastMembers({ role: Role.EMPLOYEE });
  }
}
