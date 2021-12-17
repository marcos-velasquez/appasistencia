import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { UserSeeder } from './user.seeder';
import { EmployeeController, UserController } from './controllers';
import { ExistsEmailConstraint } from '@core/user/validators';
import { IsEnabledConstraint } from './validators/is-enabled.validator';
import { ExistsRutConstraint } from './validators/exists-rut.validator';
import { MulterModule } from '@nestjs/platform-express';
import { onlyImage } from '@core/photo/validators/only-image.validator';
import { diskStorage } from 'multer';
import { setFileName } from '@core/photo/helpers/filename.helper';
import { RutAlreadyConstraint } from './validators/rut-already.validator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MulterModule.register({
      fileFilter: onlyImage,
      storage: diskStorage({ filename: setFileName, destination: 'uploads' }),
    }),
  ],
  providers: [
    UserService,
    UserSeeder,
    ExistsEmailConstraint,
    ExistsRutConstraint,
    IsEnabledConstraint,
    RutAlreadyConstraint,
  ],
  controllers: [UserController, EmployeeController],
  exports: [UserService],
})
export class UserModule {}
