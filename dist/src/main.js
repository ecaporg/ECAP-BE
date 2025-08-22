"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const auth_module_1 = require("./auth/auth.module");
const swagger_models_1 = require("./core/config/swagger.models");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
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
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    (0, class_validator_1.useContainer)(app.select(auth_module_1.AuthModule), { fallbackOnErrors: true });
    const configService = app.get(config_1.ConfigService);
    const corsOptions = {
        origin: ['http://localhost:3000', configService.get('FRONTEND_URL')],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    };
    app.enableCors(corsOptions);
    await app.listen(configService.get('PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map