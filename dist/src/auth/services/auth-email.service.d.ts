import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/users/users.service';
import { ChangeEmailDTO } from '../dtos/change-email.dto';
import { AuthUser } from '../types/auth-user';
export declare class AuthEmailService {
    private readonly jwtService;
    private readonly configService;
    private readonly emailService;
    private readonly usersService;
    constructor(jwtService: JwtService, configService: ConfigService, emailService: MailerService, usersService: UsersService);
    sendVerificationLink(email: string, username?: string): Promise<any>;
    sendNewEmailVerificationLink(changeEmailDto: ChangeEmailDTO, username?: string): Promise<any>;
    validateConfirmEmailToken(token: string): string;
    verifyEmailToken(token: string): Promise<AuthUser>;
    resendConfirmationLink(email: string): Promise<void>;
    sendForgotPasswordLink(email: string, username: string): Promise<void>;
    changeEmail(userId: number, newEmail: string): Promise<boolean>;
}
