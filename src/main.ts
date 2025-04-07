import { useContainer } from 'class-validator';
// Register path aliases for runtime
import moduleAlias from 'module-alias';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AuthModule } from './auth/auth.module';
import { ErrorResponseDto } from './core/dto/error-response.dto';
import { AppModule } from './app.module';

// For module aliases
import 'module-alias/register';
moduleAlias.addAliases({
  '@': __dirname,
  '@/core': __dirname + '/core',
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('ECAP API')
    .setDescription('Documentation for endpoints')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule],
    extraModels: [ErrorResponseDto],
  });
  SwaggerModule.setup('api/docs', app, document);

  // enable DI for class-validator
  useContainer(app.select(AuthModule), { fallbackOnErrors: true });

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'));
}
bootstrap();
