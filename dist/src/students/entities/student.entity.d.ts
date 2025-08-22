import { DatedGenericEntity } from 'src/core';
import { StudentLPEnrollmentEntity } from 'src/enrollment/entities/student-enrollment.entity';
import { AcademyEntity } from 'src/school/entities/academy.entity';
import { SchoolEntity } from 'src/school/entities/school.entity';
import { UserEntity } from 'src/users/entities/user.entity';
export declare class StudentEntity extends DatedGenericEntity {
    id: number;
    school_id: number;
    academy_id: number;
    school: SchoolEntity;
    user: UserEntity;
    academy: AcademyEntity;
    student_lp_enrollments: StudentLPEnrollmentEntity[];
}
