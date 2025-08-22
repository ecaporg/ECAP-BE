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
        name: string;
        password: string;
        isActive: boolean;
        emailVerified: boolean;
        refreshToken?: string;
        role?: import("../../users/enums/roles.enum").RolesEnum;
        canvas_additional_info?: Record<string, any>;
        student?: import("../../students/entities/student.entity").StudentEntity;
        teacher?: import("../../staff/entities/staff.entity").TeacherEntity;
        director?: import("../../staff/entities/staff.entity").DirectorEntity;
        admin?: import("../../staff/entities/staff.entity").AdminEntity;
        id: number;
        updatedAt: Date;
        createdAt: Date;
    }>;
}
export {};
