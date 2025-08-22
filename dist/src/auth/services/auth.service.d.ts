import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthTokensDTO } from '../dtos/auth-tokens.dto';
import { ChangeEmailPasswordDTO } from '../dtos/change-email.dto';
import { LoginResponseDTO } from '../dtos/login-response.dto';
import { ResetPasswordDTO } from '../dtos/reset-password.dto';
import { AuthUser } from '../types/auth-user';
import { AuthEmailService } from './auth-email.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly configService;
    private readonly authEmailService;
    constructor(userService: UsersService, jwtService: JwtService, configService: ConfigService, authEmailService: AuthEmailService);
    validateUserEmailPassword(email: string, password: string): Promise<AuthUser | null>;
    validateUserById(userId: number): Promise<AuthUser | null>;
    signIn(user: AuthUser): Promise<LoginResponseDTO>;
    updateUserRefreshToken(userId: number, refreshToken: string): Promise<UserEntity>;
    refreshTokens(userId: number, refreshToken: string): Promise<AuthTokensDTO>;
    getTokens(authUser: AuthUser): Promise<AuthTokensDTO>;
    logOut(userId: number): Promise<UserEntity>;
    signUp(user: CreateUserDTO): Promise<AuthUser>;
    forgotPassword(email: string): Promise<boolean>;
    resetPassword(userId: number, resetPasswordDTO: ResetPasswordDTO): Promise<{
        success: boolean;
    }>;
    changePassword(userId: number, newPassword: string): Promise<{
        success: boolean;
    }>;
    private getAuthUser;
    handleEmailUpdate(userId: number, { password, newEmail }: ChangeEmailPasswordDTO): Promise<boolean>;
}
