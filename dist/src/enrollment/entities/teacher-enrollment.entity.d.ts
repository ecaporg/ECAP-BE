import { GenericEntity } from 'src/core';
import { StudentLPEnrollmentEntity } from 'src/enrollment/entities/student-enrollment.entity';
import { SchoolEntity } from 'src/school/entities/school.entity';
import { TeacherEntity } from 'src/staff/entities/staff.entity';
import { AcademicYearEntity } from 'src/track/entities/academic-year.entity';
export declare class TeacherSchoolYearEnrollmentEntity extends GenericEntity {
    school_id: number;
    teacher_id: number;
    academic_year_id: number;
    school: SchoolEntity;
    teacher: TeacherEntity;
    academic_year: AcademicYearEntity;
    student_lp_enrollments: StudentLPEnrollmentEntity[];
}
