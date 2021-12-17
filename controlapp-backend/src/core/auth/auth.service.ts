import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CurrentUser } from '@core/auth/interfaces/current-user.interface';
import { UserService } from '@core/user/user.service';
import { User, UserDto } from '@core/user/user.schema';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService, private eventEmitter: EventEmitter2) {}

  findOne(field: Partial<UserDto>) {
    return this.userService.findOne(field);
  }

  async login(payload: Partial<User>) {
    return { token: this.jwtService.sign(payload) };
  }

  async forgotPassword(email: string) {
    const user = await this.findOne({ email });
    const token = this.jwtService.sign({ _id: user._id }, { expiresIn: '15m' });
    this.eventEmitter.emit('user.forgot', user, token);
  }

  async newPassword(token: string, password: string) {
    const user = <CurrentUser>this.jwtService.decode(token);
    await this.userService.updateOne(user._id, { password });
  }

  async changePassword(_id: Types.ObjectId, password: string) {
    await this.userService.updateOne(_id, { password });
  }
}
