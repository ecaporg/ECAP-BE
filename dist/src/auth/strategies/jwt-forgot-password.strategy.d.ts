import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { EmailDTO } from '../dtos/email.dto';
declare const JwtForgotPasswordStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtForgotPasswordStrategy extends JwtForgotPasswordStrategy_base {
    private readonly usersService;
    private readonly configService;
    constructor(usersService: UsersService, configService: ConfigService);
    validate({ email }: EmailDTO): Promise<import("../../users/entities/user.entity").UserEntity>;
}
export {};
