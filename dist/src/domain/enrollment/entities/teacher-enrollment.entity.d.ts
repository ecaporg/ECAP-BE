import { ITeacherEnrollment } from 'ecap-lib/dist/domain';
import { Relation } from 'typeorm';
import { IDGenericEntity } from '../../../core';
import { StudentLPEnrollmentEntity } from '../../enrollment/entities/student-enrollment.entity';
import { TeacherEntity } from '../../staff/entities/staff.entity';
import { AcademicYearEntity } from '../../track/entities/academic-year.entity';
export declare class TeacherEnrollmentEntity extends IDGenericEntity implements ITeacherEnrollment {
    teacher_id: number;
    academic_year_id: number;
    teacher: Relation<TeacherEntity>;
    academic_year: Relation<AcademicYearEntity>;
    student_lp_enrollments: Relation<StudentLPEnrollmentEntity[]>;
}
