import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthTokensDTO } from '../dtos/auth-tokens.dto';
import { EmailDTO } from '../dtos/email.dto';
import { LoginResponseDTO } from '../dtos/login-response.dto';
import { PasswordDTO } from '../dtos/password.dto';
import { ResetPasswordDTO } from '../dtos/reset-password.dto';
import { AuthService } from '../services/auth.service';
import { AuthUser } from '../types/auth-user';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(createUserDto: CreateUserDTO): Promise<AuthUser>;
    signIn(user: AuthUser): Promise<LoginResponseDTO>;
    refreshToken(userId: number, refreshToken: string): Promise<AuthTokensDTO>;
    sendForgotPasswordLink({ email }: EmailDTO): Promise<boolean>;
    resetPassword(userId: number, resetPasswordDTO: ResetPasswordDTO): Promise<{
        success: boolean;
    }>;
    changeForgottenPassword(userId: number, { password }: PasswordDTO): Promise<{
        success: boolean;
    }>;
    getMe(user: UserEntity): UserEntity;
}
