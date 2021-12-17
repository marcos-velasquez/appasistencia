import { CommandModule } from 'nestjs-command';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@shared/shared.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CoreModule } from './core/core.module';
import { LibsModule } from '@libs/libs.module';
import { join } from 'path';

@Module({
  imports: [
    CoreModule,
    SharedModule,
    LibsModule,
    CommandModule,
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.development' }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get('DATABASE_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      renderPath: 'photos',
      serveRoot: '/appasistencias/api/v1',
      rootPath: join(process.cwd(), 'uploads'),
    }),
  ],
})
export class AppModule {}
