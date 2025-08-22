import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SWAGGER_API_MODELS } from './swagger.models';

export function setupSwagger(app: INestApplication) {
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

  // Custom Swagger options for production compatibility
  const swaggerOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'ECAP API Documentation',
  };

  SwaggerModule.setup('api/docs', app, document, swaggerOptions);
}
