import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { IAuthUser } from '../types/auth-user';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<IAuthUser>;
}
export {};
