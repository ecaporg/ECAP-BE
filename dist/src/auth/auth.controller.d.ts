import { CreateUserDTO } from '../users/dtos/create-user.dto';
import { AuthTokensDTO } from './dtos/auth-tokens.dto';
import { EmailDTO } from './dtos/email.dto';
import { LoginResponseDTO } from './dtos/login-response.dto';
import { PasswordDTO } from './dtos/password.dto';
import { ResetPasswordDTO } from './dtos/reset-password.dto';
import { IAuthUser } from './types/auth-user';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(createUserDto: CreateUserDTO): Promise<IAuthUser>;
    signIn(user: IAuthUser): Promise<LoginResponseDTO>;
    refreshToken(userId: number, refreshToken: string): Promise<AuthTokensDTO>;
    sendForgotPasswordLink({ email }: EmailDTO): Promise<boolean>;
    resetPassword(userId: number, resetPasswordDTO: ResetPasswordDTO): Promise<{
        success: boolean;
    }>;
    changeForgottenPassword(userId: number, { password }: PasswordDTO): Promise<{
        success: boolean;
    }>;
}
