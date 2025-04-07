"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../core");
const create_user_dto_1 = require("../users/dtos/create-user.dto");
const account_verified_1 = require("./decorators/account-verified");
const auth_tokens_dto_1 = require("./dtos/auth-tokens.dto");
const email_dto_1 = require("./dtos/email.dto");
const login_response_dto_1 = require("./dtos/login-response.dto");
const password_dto_1 = require("./dtos/password.dto");
const reset_password_dto_1 = require("./dtos/reset-password.dto");
const sign_in_dto_1 = require("./dtos/sign-in.dto");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signUp(createUserDto) {
        return this.authService.signUp(createUserDto);
    }
    signIn(user) {
        return this.authService.signIn(user);
    }
    refreshToken(userId, refreshToken) {
        return this.authService.refreshTokens(userId, refreshToken);
    }
    sendForgotPasswordLink({ email }) {
        return this.authService.forgotPassword(email);
    }
    resetPassword(userId, resetPasswordDTO) {
        return this.authService.resetPassword(userId, resetPasswordDTO);
    }
    changeForgottenPassword(userId, { password }) {
        return this.authService.changePassword(userId, password);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('sign-up'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new user' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: sign_in_dto_1.SignInDTO }),
    (0, account_verified_1.AccountVerified)('local'),
    (0, common_1.Post)('sign-in'),
    (0, swagger_1.ApiOperation)({ summary: 'Authenticate user with credentials' }),
    (0, core_1.ApiCrudResponse)(login_response_dto_1.LoginResponseDTO),
    __param(0, (0, core_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, account_verified_1.AccountVerified)('jwt-refresh'),
    (0, common_1.Post)('refresh-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh authentication tokens' }),
    (0, core_1.ApiCrudResponse)(auth_tokens_dto_1.AuthTokensDTO),
    __param(0, (0, core_1.CurrentUser)('id')),
    __param(1, (0, core_1.CurrentUser)('refreshToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Request password reset link' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password reset link sent' }),
    (0, core_1.ApiErrorResponses)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_dto_1.EmailDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "sendForgotPasswordLink", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, account_verified_1.AccountVerified)('jwt'),
    (0, common_1.Post)('reset-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Reset user password' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password successfully reset' }),
    (0, core_1.ApiErrorResponses)(),
    __param(0, (0, core_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, reset_password_dto_1.ResetPasswordDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, account_verified_1.AccountVerified)('jwt-forgot-password'),
    (0, common_1.Post)('change-forgotten-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Change password using reset token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password successfully changed' }),
    (0, core_1.ApiErrorResponses)(),
    __param(0, (0, core_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, password_dto_1.PasswordDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changeForgottenPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map