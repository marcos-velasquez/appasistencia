import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@core/user/user.schema';

@Injectable()
export class MailUserService {
  constructor(private readonly mailerService: MailerService, private config: ConfigService) {}

  @OnEvent('user.forgot', { async: true })
  public async sendForgotPassword(user: User, token: string) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Recuperar contraseña ✔',
        template: 'forgot-password',
        context: {
          linkFrontend: this.config.get('FRONTEND_URL') + '#/auth/nueva-credencial/' + token,
          link: this.config.get('API_URL'),
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
