import { useContainer } from 'class-validator';

// import { DataSource } from 'typeorm';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

import { AuthModule } from './auth/auth.module';
import { setupSwagger } from './core/config/swagger.setup';
import { AppModule } from './app.module';

let app: NestExpressApplication;

async function createNestApp(): Promise<NestExpressApplication> {
  if (!app) {
    const server = express();
    app = await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(server),
      {
        logger:
          process.env.NODE_ENV === 'production' ? ['error', 'warn'] : undefined,
      },
    );

    app.setGlobalPrefix('api');

    setupSwagger(app);

    // useContainer(app.select(AuthModule), { fallbackOnErrors: true });

    let configService: ConfigService;
    try {
      configService = app.get(ConfigService);
    } catch (error) {
      console.warn('ConfigService not available, using default values');
      configService = null;
    }

    const corsOptions: CorsOptions = {
      origin: [
        'http://localhost:3000',
        configService?.get('FRONTEND_URL') || 'http://localhost:3000',
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    };

    app.enableCors(corsOptions);
    await app.init();
  }
  return app;
}

async function bootstrap() {
  const app = await createNestApp();
  let configService: ConfigService;
  try {
    configService = app.get(ConfigService);
  } catch (error) {
    console.warn('ConfigService not available, using default values');
    configService = null;
  }

  const port = configService?.get('PORT') || process.env.PORT || 3001;
  await app.listen(port);
}

// Vercel handler export
export default async function handler(req: any, res: any) {
  const app = await createNestApp();
  const expressInstance = app.getHttpAdapter().getInstance();
  return expressInstance(req, res);
}

// Запускаємо локально, якщо не в Vercel
if (process.env.VERCEL !== '1') {
  bootstrap();
}
