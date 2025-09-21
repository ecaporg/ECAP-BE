import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { AuthUser } from '../types/auth-user';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<AuthUser>;
}
export {};
