import { MobileIdentifierGuard } from './guards/mobile-identifier.guard';
import { Controller, Post, UseGuards, Request, Get, Body, Param, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from '@core/auth/auth.service';
import { SkipAuth } from '@core/auth/decorators/is-public.decorator';
import { CurrentUser } from '@core/auth/interfaces/current-user.interface';
import { User } from '@shared/decorators';
import { ChangePasswordDto, ForgotPasswordDto, LoginDto, NewPasswordDto, TokenDto } from './dto';
import { Role } from './enums/role.enum';
import { Roles } from './decorators';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @UseGuards(AuthGuard('local'), MobileIdentifierGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Roles(Role.EMPLOYEE, Role.ADMIN)
  @Patch('change-password')
  async changePassword(@Body() { password }: ChangePasswordDto, @User() { _id }: CurrentUser) {
    await this.authService.changePassword(_id, password);
    return 'Contraseña actualizada';
  }

  @Roles(Role.EMPLOYEE, Role.ADMIN)
  @Get('profile')
  async profile(@User() { _id }: CurrentUser) {
    return this.authService.findOne({ _id });
  }

  @SkipAuth()
  @Post('forgot-password')
  async recoverPassword(@Body() { email }: ForgotPasswordDto) {
    await this.authService.forgotPassword(email);
    return 'Correo enviado exitosamente';
  }

  @SkipAuth()
  @Post('new-password/:token')
  async newPassword(@Param() { token }: TokenDto, @Body() { password }: NewPasswordDto) {
    await this.authService.newPassword(token, password);
    return 'Contraseña actualizada';
  }
}
