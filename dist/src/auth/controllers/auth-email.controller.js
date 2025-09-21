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
exports.AuthEmailController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("../../core");
const email_dto_1 = require("../dtos/email.dto");
const auth_email_service_1 = require("../services/auth-email.service");
let AuthEmailController = class AuthEmailController {
    constructor(authEmailService) {
        this.authEmailService = authEmailService;
    }
    verifyEmail(token) {
        return this.authEmailService.verifyEmailToken(token);
    }
    resendConfirmationLink({ email }) {
        return this.authEmailService.resendConfirmationLink(email);
    }
};
exports.AuthEmailController = AuthEmailController;
__decorate([
    (0, common_1.Get)('verify'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify email with token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Email successfully verified' }),
    (0, core_1.ApiErrorResponses)(),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthEmailController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('resend-confirmation-link'),
    (0, swagger_1.ApiOperation)({ summary: 'Resend email confirmation link' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Confirmation link sent' }),
    (0, core_1.ApiErrorResponses)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_dto_1.EmailDTO]),
    __metadata("design:returntype", void 0)
], AuthEmailController.prototype, "resendConfirmationLink", null);
exports.AuthEmailController = AuthEmailController = __decorate([
    (0, swagger_1.ApiTags)('Authentication - email'),
    (0, common_1.Controller)('auth/email'),
    __metadata("design:paramtypes", [auth_email_service_1.AuthEmailService])
], AuthEmailController);
//# sourceMappingURL=auth-email.controller.js.map