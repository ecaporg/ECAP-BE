import { IAdmin, IDirector, IStaff, ITeacher } from 'ecap-lib/dist/domain';
import { Relation } from 'typeorm';
import { UserEntity } from '../../../auth/entities/user.entity';
import { IDIntGenericEntity } from '../../../core';
import { TeacherEnrollmentEntity } from '../../enrollment/entities/teacher-enrollment.entity';
import { AcademyEntity } from '../../school/entities/academy.entity';
import { TenantEntity } from '../../tenant/entities/tenant.entity';
export declare abstract class StaffEntity extends IDIntGenericEntity implements IStaff {
    id: number;
    user: Relation<UserEntity>;
    tenant_id: number;
}
export declare class TeacherEntity extends StaffEntity implements ITeacher {
    teacher_enrollments: Relation<TeacherEnrollmentEntity[]>;
    tenant_id: number;
    tenant: Relation<TenantEntity>;
}
export declare class AdminEntity extends StaffEntity implements IAdmin {
    tenant_id: number;
    tenant: Relation<TenantEntity>;
}
export declare class DirectorEntity extends StaffEntity implements IDirector {
    tenant_id: number;
    tenant: Relation<TenantEntity>;
    academy_id: number;
    academy: Relation<AcademyEntity>;
}
