import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { ChangeEmailDTO } from './../dtos/change-email.dto';
declare const JwtChangeEmailStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtChangeEmailStrategy extends JwtChangeEmailStrategy_base {
    private readonly usersService;
    private readonly configService;
    constructor(usersService: UsersService, configService: ConfigService);
    validate({ email, newEmail }: ChangeEmailDTO): Promise<{
        newEmail: string;
        email: string;
        firstname: string;
        lastname: string;
        password: string;
        isActive: boolean;
        emailVerified: boolean;
        refreshToken?: string;
        userRoles: import("../../users/entities/user-role.entity").UserRoleEntity[];
        id: number;
        updatedAt: Date;
        createdAt: Date;
    }>;
}
export {};
