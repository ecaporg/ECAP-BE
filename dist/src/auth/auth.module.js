"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./controllers/auth.controller");
const auth_email_controller_1 = require("./controllers/auth-email.controller");
const auth_service_1 = require("./services/auth.service");
const auth_email_service_1 = require("./services/auth-email.service");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const jwt_forgot_password_strategy_1 = require("./strategies/jwt-forgot-password.strategy");
const jwt_refresh_strategy_1 = require("./strategies/jwt-refresh.strategy");
const local_strategy_1 = require("./strategies/local.strategy");
const email_available_1 = require("./validations/email-available");
const common_imports_1 = require("./common-imports");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [...common_imports_1.default],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            auth_email_service_1.AuthEmailService,
            jwt_strategy_1.JwtStrategy,
            jwt_refresh_strategy_1.JwtRefreshStrategy,
            jwt_forgot_password_strategy_1.JwtForgotPasswordStrategy,
            email_available_1.EmailAvailableConstraint,
        ],
        controllers: [auth_controller_1.AuthController, auth_email_controller_1.AuthEmailController],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map