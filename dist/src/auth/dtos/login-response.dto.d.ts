import { AuthUser } from '../types/auth-user';
export declare class LoginResponseDTO {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
}
