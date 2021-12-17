import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Role } from '@core/auth/enums/role.enum';

@Injectable()
export class UserSeeder {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}

  @Command({
    command: 'create:users',
    describe: 'create users',
  })
  async create() {
    const user = await this.user.create({
      first_name: 'Admin',
      last_name: 'Admin',
      email: 'admin@admin.com',
      password: 'administrador',
      role: Role.ADMIN,
      address: 'local',
      phone: '000000',
      rut: '0000000-0',
    });
    console.log(user);
  }
}
