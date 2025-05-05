import * as moduleAlias from 'module-alias';

import 'module-alias/register';

moduleAlias.addAliases({
  '@': __dirname,
  '@/core': __dirname + '/core',
});

// Інші імпорти
import { useContainer } from 'class-validator';
import { DataSource } from 'typeorm';

import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AuthModule } from './auth/auth.module';
import { SWAGGER_API_MODELS } from './core/config/swagger.models';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('ECAP API')
    .setDescription('Documentation for endpoints')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('v1', 'API Version 1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: SWAGGER_API_MODELS,
  });
  SwaggerModule.setup('api/docs', app, document);

  useContainer(app.select(AuthModule), { fallbackOnErrors: true });

  const configService = app.get(ConfigService);

  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3000', configService.get('FRONTEND_URL')],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  app.enableCors(corsOptions);
  await app.listen(configService.get('PORT'));
}
bootstrap();
