// Інші імпорти
import { useContainer } from 'class-validator';

// import { DataSource } from 'typeorm';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from '../src/app.module';
import { AuthModule } from '../src/auth/auth.module';
import { setupSwagger } from '../src/core/config/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger:
      process.env.NODE_ENV === 'production' ? ['error', 'warn'] : undefined,
  });

  app.setGlobalPrefix('api');

  setupSwagger(app);

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
