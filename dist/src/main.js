"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moduleAlias = require("module-alias");
require("module-alias/register");
moduleAlias.addAliases({
    '@': __dirname,
    '@/core': __dirname + '/core',
});
const class_validator_1 = require("class-validator");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const auth_module_1 = require("./auth/auth.module");
const error_response_dto_1 = require("./core/dto/error-response.dto");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('ECAP API')
        .setDescription('Documentation for endpoints')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        include: [auth_module_1.AuthModule],
        extraModels: [error_response_dto_1.ErrorResponseDto],
    });
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    (0, class_validator_1.useContainer)(app.select(auth_module_1.AuthModule), { fallbackOnErrors: true });
    const configService = app.get(config_1.ConfigService);
    await app.listen(configService.get('PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map