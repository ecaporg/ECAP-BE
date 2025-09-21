"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
const swagger_models_1 = require("./swagger.models");
function setupSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('ECAP API')
        .setDescription('Documentation for endpoints')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('v1', 'API Version 1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        extraModels: swagger_models_1.SWAGGER_API_MODELS,
    });
    const swaggerOptions = {
        swaggerOptions: {
            persistAuthorization: true,
        },
        customSiteTitle: 'ECAP API Documentation',
        customfavIcon: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/favicon.ico',
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui.min.css',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-bundle.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-standalone-preset.min.js',
        ],
    };
    swagger_1.SwaggerModule.setup('api/docs', app, document, swaggerOptions);
}
//# sourceMappingURL=swagger.setup.js.map