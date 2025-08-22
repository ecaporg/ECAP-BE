"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const users_module_1 = require("../users/users.module");
exports.default = [
    users_module_1.UsersModule,
    jwt_1.JwtModule.register({}),
    passport_1.PassportModule,
    mailer_1.MailerModule.forRootAsync({
        useFactory: async (config) => ({
            transport: {
                host: config.get('MAIL_HOST'),
                port: 587,
                secure: false,
                auth: {
                    user: config.get('MAIL_USER'),
                    pass: config.get('MAIL_PASSWORD'),
                },
            },
            defaults: {
                from: `"No Reply" <${config.get('MAIL_FROM')}>`,
            },
            template: {
                dir: (0, path_1.join)(process.cwd(), 'templates'),
                adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
        inject: [config_1.ConfigService],
    }),
];
//# sourceMappingURL=common-imports.js.map