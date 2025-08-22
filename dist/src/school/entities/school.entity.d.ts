import { GenericEntity } from 'src/core';
import { TeacherSchoolYearEnrollmentEntity } from 'src/enrollment/entities/teacher-enrollment.entity';
import { StudentEntity } from 'src/students/entities/student.entity';
import { TenantEntity } from 'src/tenant/entities/tenant.entity';
export declare class SchoolEntity extends GenericEntity {
    name: string;
    tenant_id: number;
    tenant: TenantEntity;
    students: StudentEntity[];
    teacher_school_year_enrollments: TeacherSchoolYearEnrollmentEntity[];
}
