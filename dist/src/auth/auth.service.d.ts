import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthTokensDTO } from './dtos/auth-tokens.dto';
import { ChangeEmailPasswordDTO } from './dtos/change-email.dto';
import { LoginResponseDTO } from './dtos/login-response.dto';
import { ResetPasswordDTO } from './dtos/reset-password.dto';
import { IAuthUser } from './types/auth-user';
import { AuthEmailService } from './auth-email.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly configService;
    private readonly authEmailService;
    constructor(userService: UsersService, jwtService: JwtService, configService: ConfigService, authEmailService: AuthEmailService);
    validateUserEmailPassword(email: string, password: string): Promise<IAuthUser | null>;
    validateUserById(userId: number): Promise<IAuthUser | null>;
    signIn(user: IAuthUser): Promise<LoginResponseDTO>;
    updateUserRefreshToken(userId: number, refreshToken: string): Promise<UserEntity>;
    refreshTokens(userId: number, refreshToken: string): Promise<AuthTokensDTO>;
    getTokens(authUser: IAuthUser): Promise<AuthTokensDTO>;
    logOut(userId: number): Promise<UserEntity>;
    signUp(user: CreateUserDTO): Promise<IAuthUser>;
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
