import { IUser } from 'ecap-lib/dist/domain';
import { Relation } from 'typeorm';
import { IDGenericEntity } from '../../core';
import { AdminEntity, DirectorEntity, TeacherEntity } from '../../domain/staff/entities/staff.entity';
import { StudentEntity } from '../../domain/students/entities/student.entity';
import { RolesEnum } from '../enums/roles.enum';
export declare class UserEntity extends IDGenericEntity implements IUser {
    email: string;
    name: string;
    password: string;
    isActive: boolean;
    emailVerified: boolean;
    refreshToken?: string;
    role?: RolesEnum;
    canvas_additional_info?: Record<string, any>;
    student?: Relation<StudentEntity>;
    teacher?: Relation<TeacherEntity>;
    director?: Relation<DirectorEntity>;
    admin?: Relation<AdminEntity>;
}
