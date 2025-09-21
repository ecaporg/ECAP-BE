import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../services/users.service';
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
        role?: import("ecap-lib/dist/sample-mjnkmduJ").R;
        canvas_additional_info?: Record<string, any>;
        student?: import("typeorm").Relation<import("../../domain/students/entities/student.entity").StudentEntity>;
        teacher?: import("typeorm").Relation<import("../../domain/staff/entities/staff.entity").TeacherEntity>;
        director?: import("typeorm").Relation<import("../../domain/staff/entities/staff.entity").DirectorEntity>;
        admin?: import("typeorm").Relation<import("../../domain/staff/entities/staff.entity").AdminEntity>;
        id: number;
    }>;
}
export {};
