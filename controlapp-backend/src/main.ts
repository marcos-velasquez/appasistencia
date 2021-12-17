import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { StringToJsonInterceptor } from '@shared/interceptors/string-to-json.interceptor';
import { useContainer } from 'class-validator';
import { SharedModule } from '@shared/shared.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('appasistencias/api/v1');
  app.useGlobalInterceptors(new StringToJsonInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );

  useContainer(app.select(SharedModule), { fallbackOnErrors: true });

  const config = app.get(ConfigService);
  if (config.get('NODE_ENV') === 'development') {
    const configSwagger = new DocumentBuilder()
      .setTitle('API G&Servicios')
      .setVersion('1.0')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'bearer' })
      .build();
    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('appasistencias/api', app, document, {
      swaggerOptions: {
        filter: true,
        persistAuthorization: true,
      },
    });
  }

  await app.listen(config.get('PORT'));
}
bootstrap();
