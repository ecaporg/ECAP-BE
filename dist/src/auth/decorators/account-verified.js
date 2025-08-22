"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountVerified = AccountVerified;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const email_verified_guard_1 = require("../guards/email-verified.guard");
function AccountVerified(strategyType) {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)((0, passport_1.AuthGuard)(strategyType), email_verified_guard_1.EmailVerifiedGuard));
}
//# sourceMappingURL=account-verified.js.map