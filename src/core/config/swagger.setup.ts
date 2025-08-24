import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

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
  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'ECAP API Documentation',
    customfavIcon:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/favicon.ico',
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-standalone-preset.min.js',
    ],
  };

  SwaggerModule.setup('api/docs', app, document, swaggerOptions);
}
