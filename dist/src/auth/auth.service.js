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
exports.AuthService = void 0;
const argon2 = require("argon2");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("../core");
const users_service_1 = require("../users/users.service");
const auth_email_service_1 = require("./auth-email.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, configService, authEmailService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.authEmailService = authEmailService;
    }
    async validateUserEmailPassword(email, password) {
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            return null;
        }
        if (!user.isActive) {
            return null;
        }
        const matchPasswords = await argon2.verify(user.password, password);
        if (!matchPasswords) {
            return null;
        }
        return this.getAuthUser(user);
    }
    async validateUserById(userId) {
        const user = await this.userService.findUserById(userId);
        if (!user) {
            return null;
        }
        if (!user.isActive) {
            return null;
        }
        return this.getAuthUser(user);
    }
    async signIn(user) {
        const { accessToken, refreshToken } = await this.getTokens(user);
        await this.updateUserRefreshToken(user.id, refreshToken);
        return {
            accessToken,
            refreshToken,
            user,
        };
    }
    async updateUserRefreshToken(userId, refreshToken) {
        const hashedToken = await argon2.hash(refreshToken);
        return this.userService.updateUser(userId, {
            refreshToken: hashedToken,
        });
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.userService.findUserById(userId);
        if (!user || !user.refreshToken) {
            throw new core_1.ForbiddenException('Access denied (user info not found)');
        }
        const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);
        if (!refreshTokenMatches) {
            throw new core_1.ForbiddenException('Access denied (invalid refresh token)');
        }
        const authUser = await this.getAuthUser(user);
        const tokens = await this.getTokens(authUser);
        await this.updateUserRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
    async getTokens(authUser) {
        const accessTokenResponse = this.jwtService.signAsync(authUser, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES'),
        });
        const refreshTokenResponse = this.jwtService.signAsync(authUser, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES'),
        });
        const [accessToken, refreshToken] = await Promise.all([
            accessTokenResponse,
            refreshTokenResponse,
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    logOut(userId) {
        return this.userService.updateUser(userId, {
            refreshToken: null,
        });
    }
    async signUp(user) {
        const hashedPassword = await argon2.hash(user.password);
        const createdUser = await this.userService.createUser({
            ...user,
            password: hashedPassword,
        });
        await this.authEmailService.sendVerificationLink(createdUser.email, createdUser.firstname);
        return this.getAuthUser(createdUser);
    }
    async forgotPassword(email) {
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new core_1.NotFoundException('User not found');
        }
        if (!user.isActive) {
            throw new core_1.UnauthorizedException('User is inactive');
        }
        const { firstname, lastname } = user;
        const username = `${firstname} ${lastname}`;
        await this.authEmailService.sendForgotPasswordLink(email, username);
        return true;
    }
    async resetPassword(userId, resetPasswordDTO) {
        const user = await this.userService.findUserById(userId);
        const matchPasswords = await argon2.verify(user.password, resetPasswordDTO.oldPassword);
        if (!matchPasswords) {
            throw new core_1.BadRequestException('Password is not correct');
        }
        return this.changePassword(userId, resetPasswordDTO.newPassword);
    }
    async changePassword(userId, newPassword) {
        const hashedPassword = await argon2.hash(newPassword);
        await this.userService.updatePassword(userId, hashedPassword);
        return { success: true };
    }
    async getAuthUser(user) {
        const { id, firstname, lastname, email, isActive, emailVerified } = user;
        const rolesResponse = await this.userService.getUserRoles(user.id);
        const roles = rolesResponse.map((role) => role.name);
        return {
            id,
            firstname,
            lastname,
            email,
            isActive,
            emailVerified: emailVerified || false,
            roles,
        };
    }
    async handleEmailUpdate(userId, { password, newEmail }) {
        const user = await this.userService.findUserById(userId);
        const matchPasswords = await argon2.verify(user.password, password);
        if (!matchPasswords) {
            throw new core_1.BadRequestException('Password is not correct');
        }
        const emailAlreadyUsed = await this.userService.findUserByEmail(newEmail);
        if (emailAlreadyUsed) {
            throw new core_1.BadRequestException('Email has been taken by another user');
        }
        const { firstname, lastname } = user;
        const username = `${firstname} ${lastname}`;
        await this.authEmailService.sendNewEmailVerificationLink({
            email: user.email,
            newEmail,
        }, username);
        return true;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        auth_email_service_1.AuthEmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map