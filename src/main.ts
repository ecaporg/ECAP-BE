// Інші імпорти
import { useContainer } from 'class-validator';

// import { DataSource } from 'typeorm';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AuthModule } from './auth/auth.module';
import { setupSwagger } from './core/config/swagger.setup';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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

  // Для Vercel serverless functions
  const isVercel = process.env.VERCEL === '1';
  if (isVercel) {
    await app.init();
    return app.getHttpAdapter().getInstance();
  }

  // Для локального розробки
  await app.listen(configService.get('PORT') || 3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

// Для локального запуску
if (require.main === module) {
  bootstrap();
}

// Експорт для Vercel
export default bootstrap;
