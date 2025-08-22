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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthEmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const mailer_1 = require("@nestjs-modules/mailer");
const core_1 = require("../../core");
const users_service_1 = require("../../users/users.service");
let AuthEmailService = class AuthEmailService {
    constructor(jwtService, configService, emailService, usersService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.emailService = emailService;
        this.usersService = usersService;
    }
    async sendVerificationLink(email, username) {
        const token = this.jwtService.sign({ email }, {
            secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
            expiresIn: this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME'),
        });
        const link = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;
        try {
            return await this.emailService.sendMail({
                to: email,
                subject: 'Welcome to the application. To confirm the email address',
                template: './confirmation',
                context: {
                    username: username || email,
                    link,
                },
            });
        }
        catch (message) {
            return console.error(message);
        }
    }
    async sendNewEmailVerificationLink(changeEmailDto, username) {
        const token = this.jwtService.sign({ email: changeEmailDto.email, newEmail: changeEmailDto.newEmail }, {
            secret: this.configService.get('JWT_CHANGE_EMAIL_TOKEN_SECRET'),
            expiresIn: this.configService.get('JWT_CHANGE_EMAIL_TOKEN_SECRET_EXPIRATION_TIME'),
        });
        const link = `${this.configService.get('NEW_EMAIL_CONFIRMATION_URL')}?token=${token}`;
        try {
            return await this.emailService.sendMail({
                to: changeEmailDto.newEmail,
                subject: 'Confirm your new email address',
                template: './confirmation',
                context: {
                    username: username || changeEmailDto.newEmail,
                    link,
                },
            });
        }
        catch (message) {
            return console.error(message);
        }
    }
    validateConfirmEmailToken(token) {
        const { email } = this.jwtService.verify(token, {
            secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
        });
        if (email) {
            return email;
        }
        throw new core_1.BadRequestException('Invalid token payload');
    }
    async verifyEmailToken(token) {
        const email = this.validateConfirmEmailToken(token);
        const user = await this.usersService.findUserByEmail(email);
        if (!user.isActive) {
            throw new core_1.UnauthorizedException('User is not active');
        }
        await this.usersService.markEmailAsVerified(email);
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            isActive: user.isActive,
            emailVerified: true,
            role: user.role,
        };
    }
    async resendConfirmationLink(email) {
        const user = await this.usersService.findUserByEmail(email);
        if (user.emailVerified) {
            throw new core_1.BadRequestException('Email has been verified');
        }
        await this.sendVerificationLink(user.email);
    }
    async sendForgotPasswordLink(email, username) {
        const token = this.jwtService.sign({ email }, {
            secret: this.configService.get('JWT_FORGOT_PASSWORD_TOKEN_SECRET'),
            expiresIn: this.configService.get('JWT_FORGOT_PASSWORD_TOKEN_EXPIRATION_TIME'),
        });
        const link = `${this.configService.get('FORGOT_PASSWORD_URL')}?token=${token}`;
        try {
            return await this.emailService.sendMail({
                to: email,
                subject: 'Reset your password',
                template: './restore-password',
                context: {
                    username: username,
                    link,
                },
            });
        }
        catch (message) {
            return console.error(message);
        }
    }
    async changeEmail(userId, newEmail) {
        await this.usersService.updateUser(userId, { email: newEmail });
        return true;
    }
};
exports.AuthEmailService = AuthEmailService;
exports.AuthEmailService = AuthEmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        mailer_1.MailerService,
        users_service_1.UsersService])
], AuthEmailService);
//# sourceMappingURL=auth-email.service.js.map