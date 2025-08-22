import { GenericEntity } from 'src/core';
import { AdminEntity, TeacherEntity } from 'src/staff/entities/staff.entity';
import { DirectorEntity } from 'src/staff/entities/staff.entity';
import { StudentEntity } from 'src/students/entities/student.entity';
import { RolesEnum } from '../enums/roles.enum';
export declare class UserEntity extends GenericEntity {
    email: string;
    name: string;
    password: string;
    isActive: boolean;
    emailVerified: boolean;
    refreshToken?: string;
    role?: RolesEnum;
    canvas_additional_info?: Record<string, any>;
    student?: StudentEntity;
    teacher?: TeacherEntity;
    director?: DirectorEntity;
    admin?: AdminEntity;
}
