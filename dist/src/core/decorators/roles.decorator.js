"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = Roles;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const email_verified_guard_1 = require("../../auth/guards/email-verified.guard");
const role_guard_1 = require("../guards/role.guard");
function Roles(...roles) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(role_guard_1.ROLES_KEY, roles), (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), email_verified_guard_1.EmailVerifiedGuard, role_guard_1.RoleGuard), (0, swagger_1.ApiBearerAuth)());
}
//# sourceMappingURL=roles.decorator.js.map