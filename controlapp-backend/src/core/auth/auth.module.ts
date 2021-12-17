import { MobileIdentifierGuard } from './guards/mobile-identifier.guard';
import { Authenticators } from './authenticators/authenticators.strategy';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@core/auth/auth.controller';
import { AuthService } from '@core/auth/auth.service';
import { EmailAlreadyConstraint, IsValidTokenConstraint } from '@core/auth/validators';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './authenticators/jwt';
import { RolesGuard } from './guards/roles.guard';
import { UserModule } from '@core/user/user.module';

@Module({
  providers: [
    AuthService,
    IsValidTokenConstraint,
    EmailAlreadyConstraint,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    MobileIdentifierGuard,
    ...Authenticators,
  ],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
