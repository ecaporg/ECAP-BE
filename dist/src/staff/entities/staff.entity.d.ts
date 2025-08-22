import { DatedGenericEntity } from 'src/core';
import { TeacherSchoolYearEnrollmentEntity } from 'src/enrollment/entities/teacher-enrollment.entity';
import { AcademyEntity } from 'src/school/entities/academy.entity';
import { TenantEntity } from 'src/tenant/entities/tenant.entity';
import { UserEntity } from 'src/users/entities/user.entity';
export declare abstract class StaffEntity extends DatedGenericEntity {
    id: number;
    user: UserEntity;
}
export declare class TeacherEntity extends StaffEntity {
    teacher_school_year_enrollments: TeacherSchoolYearEnrollmentEntity[];
}
export declare class AdminEntity extends StaffEntity {
    tenant_id: number;
    tenant: TenantEntity;
}
export declare class DirectorEntity extends AdminEntity {
    academy_id: number;
    academy: AcademyEntity;
}
