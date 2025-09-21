import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { ChangeEmailDTO } from '../dtos/change-email.dto';
import { AuthUser } from '../types/auth-user';
export declare class AuthEmailService {
    private readonly jwtService;
    private readonly configService;
    private readonly usersService;
    constructor(jwtService: JwtService, configService: ConfigService, usersService: UsersService);
    sendVerificationLink(email: string, username?: string): Promise<void>;
    sendNewEmailVerificationLink(changeEmailDto: ChangeEmailDTO, username?: string): Promise<void>;
    validateConfirmEmailToken(token: string): string;
    verifyEmailToken(token: string): Promise<AuthUser>;
    resendConfirmationLink(email: string): Promise<void>;
    sendForgotPasswordLink(email: string, username: string): Promise<void>;
    changeEmail(userId: number, newEmail: string): Promise<boolean>;
}
