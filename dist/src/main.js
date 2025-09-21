"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const auth_module_1 = require("./auth/auth.module");
const swagger_setup_1 = require("./core/config/swagger.setup");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : undefined,
    });
    app.setGlobalPrefix('api');
    (0, swagger_setup_1.setupSwagger)(app);
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