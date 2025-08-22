"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../users/entities/user.entity");
class AuthUser extends (0, swagger_1.OmitType)(user_entity_1.UserEntity, [
    'password',
    'refreshToken',
]) {
}
exports.AuthUser = AuthUser;
//# sourceMappingURL=auth-user.js.map