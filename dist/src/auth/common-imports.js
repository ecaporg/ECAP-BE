"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const users_module_1 = require("./users.module");
exports.default = [
    users_module_1.UsersModule,
    jwt_1.JwtModule.register({}),
    passport_1.PassportModule,
];
//# sourceMappingURL=common-imports.js.map