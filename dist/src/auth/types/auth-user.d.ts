import { UserEntity } from 'src/users/entities/user.entity';
declare const AuthUser_base: import("@nestjs/common").Type<Omit<UserEntity, "password" | "refreshToken">>;
export declare class AuthUser extends AuthUser_base {
}
export interface IAuthUserRefreshToken extends AuthUser {
    refreshToken: string;
}
export {};
