import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { IAuthUser, IAuthUserRefreshToken } from '../types/auth-user';
declare const JwtRefreshStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private readonly authService;
    private readonly configService;
    constructor(authService: AuthService, configService: ConfigService);
    validate(req: Request, { id }: IAuthUser): Promise<IAuthUserRefreshToken>;
}
export {};
