import { IAuthUser } from '../types/auth-user';
export declare class LoginResponseDTO {
    accessToken: string;
    refreshToken: string;
    user: IAuthUser;
}
